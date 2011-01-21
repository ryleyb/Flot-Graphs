/*
    This code is a direct port to jQuery originally written in Prototype 
    by Fabien Menager for the flotr project.

    TODO:
    -add more plugins (Ryley won't be doing this)
*/
function insertElement(object, title, name, container){
    var input;
    switch (object.type) {
        case String:
            if (!object.values) {
                input = $(document.createElement('input'));
                input.val(object.def);
            }
            else {
                input = $(document.createElement('select'));
                $.each(object.values,function(i,v){
                    input.append('<option value="'+v+'"'+((object.def == v)?'selected="selected"':'')+'>'+
                        ((object.labels && object.labels[i])?object.labels[i]:v)+'</option>');
                });
            }
            break;
        case Function:
            input = $(document.createElement('textarea'));
            input.attr('cols',30).attr('rows',3).val(object.def.toString());
            break;
        case Number:
            input = $(document.createElement('input'));
            input.attr('type','text').attr('size',2).val(object.def);
            break;
        case Boolean:
            input = $(document.createElement('input'));
            input.attr('type','checkbox').attr('checked',object.def);
            break;
        case Color:
        default:
            //this is a horrible failure, but basically, Color is our only non-builtin type, and it fails to copy
            //to axes due to the way extend works.
            object.type = Color;
            input = $(document.createElement('input'));
            input.attr('type','text').attr('size',8).val(object.def);
            break;
    }
    input.attr('name',name);
    input.attr('id',name);
    input.attr('disabled',true);
    var activator = $(document.createElement('input'));
    activator.attr('type','checkbox').css('float','left').click(function(){
        input.attr('disabled',!this.checked);
        input.parent().toggleClass('active');
    });
    var line = $(document.createElement('div')).addClass('line removeable').append(activator);

    var label = $(document.createElement('label')).append('<span>'+title+'</span>').append(input);

    line.append(label);
    if (object.type == Color){
        var wheel = $(document.createElement('div')).addClass('wheel removeable');
        line.append(wheel);
        $(wheel).farbtastic(input).hide();
        input.focus(function(){
            $(wheel).show();
        }).blur(function(){
            $(wheel).hide();
            $(this).change();
        });
    } 
    container.append(line);
}

function buildForm(specs, form){
  var opt;
    $.each(specs,function(key,o){
        if (o.def == undefined) {
            opt = o._options;
            
            if (!opt.inherited && form.attr('name') != 'global') { return true; }
            if ((opt.axis || opt.seriesOnly) && form.attr('name') == 'global') { return true; }
            var legend = $(document.createElement('legend')).html('<a href="javascript:;">' + opt.title + '</a>'),
                fieldset = $(document.createElement('legend')).addClass('removeable').append(legend),
                container = $(document.createElement('span'));
                
            fieldset.append(container);
            form.append(fieldset);
            legend.click(function(){ container.toggle();});
            
            if (opt.collapsed) container.hide();
    
            $.each(o,function(k,v){
                if (v && k != '_options'){
                    insertElement(v, k, key + '-' + k, container);
                }
            });
        }
        else 
            if (form.attr('name') == 'global') {
                insertElement(o, key, key, form);
            }
    });
}

function input(){
  var options = {}, 
      series = [];
      
  eval($('#input-code').val());
  
  $('.removeable').remove();
  
    buildForm(specs, $(document.forms.global));
    
    $('input,select,textarea',document.forms.global).each(function(e){
        $(this).change(draw);
    });
  
  buildDataForms();
    
  $('#tabs').tabs();
  $('#tabs-io').tabs();
}

function draw(){
    var globalOptions = formToOptions($(document.forms.global)), series = [];
    
    $.each(data,function(i,serie){
        $.extend(serie, formToOptions($(document.forms[serie.id + '-options'])));
        inputsToData($(document.forms[serie.id + '-data']), serie);
        inputsToSerie(document.forms[serie.id + '-serie'], serie);
        
        if (!serie.hide) 
            series.push(serie);
    });
    
    var f = $.plot($('#container'), series, globalOptions);
    
    writeCode($('#output-code'), series, globalOptions);
}

function writeCode(container, series, options){
    container.html('options = <span style="white-space: normal">' + $.toJSON(options) + ';</span><br /><br />series = ' + $.toJSON(series) + ';');
}

function getOptionValue(element){
    if (element.nodeName.match(/^textarea$/i)) {
        eval('window.__FlotFunc = ' + element.value);
        window.__FlotFunc.toJSON = function(){ return element.value.replace(/\n/g,'<br/>'); } ;
        return window.__FlotFunc;
    }
    else 
        if (element.nodeName.match(/^input$/i)) {
            if (element.type == 'text') {
                if (element.size == 2) 
                    return element.value === '' ? null : parseFloat(element.value);
                else 
                    return element.value;
            }
            else 
                if (element.type == 'checkbox') {
                    return !!element.checked;
                }
        }
        else 
            if (element.nodeName.match(/^select$/i)) {
                return element.options[element.selectedIndex].value;
            }
}

function formToOptions(form){
    var options = {}, parts, value,matches;
    form.find('input,select,textarea').each(function(i,e){
        if (e.disabled || !e.name) { return true; }

        parts = e.name.split('-');
        value = $(e).val();
        
        if ((matches = parts[0].match(/(x|y)axis(\d*)/))) {
            var axis = 0;
            if (matches[2]){
                axis = matches[2]-1;
            }
            if (matches[1] == 'x' && !options.xaxes)
                options.xaxes = [{}];
            if (matches[1] == 'y' && !options.yaxes)
                options.yaxes = [{}];
            if (matches[1] == 'x' && !options.xaxes[axis])
                options.xaxes[axis] = {};
            if (matches[1] == 'y' && !options.yaxes[axis])
                options.yaxes[axis] = {};
            options[matches[1]+'axes'][axis][parts[1]] = getOptionValue(e);
        } else {
            if (parts[1]) {
                options[parts[0]] = options[parts[0]] || {};
                options[parts[0]][parts[1]] = getOptionValue(e);
            }
            else {
                options[parts[0]] = getOptionValue(e);
            }
        }
    });
    return options;
}


function getDataInputs(data, n){
    n = n || 5;
    
    var i, str = '<div class="data-entry">', type = ['x', 'y', 'a', 'b', 'c'];
    for (i = 0; i < n; i++) {
        str += '<input type="text" size="2" value="' + (data ? (data[i] || 0) : '') + '" name="' + type[i] + '" class="level-' + i + '" ' + (i > 5 ? 'disabled="disabled"' : '') + '/>';
    }
    str += '<a href="javascript:;" onclick="$(this).parent().remove()">-</a></div>';
    return str;
}

function inputsToData(form, serie){
    var i, data = {x: [], y: [], a: [], b: [], c: []};
    
    $.each(data,function(k,v){
        form.find('input[name="'+k+'"]').each(function(i,e){
            if (!e.disabled && e.value) {
                data[k].push(parseFloat(e.value));
            }
        });
    });
    serie.data = [];
    for (i = 0; i < data.x.length; i++) {
        serie.data.push([data.x[i], data.y[i]]);
    }
}

function inputsToSerie(form, serie){
    var els = form.elements;
    serie.label = els.label.value;
    serie.color = els.color.value?els.color.value:null;//default to nothing, which will let flot fill it
    var xaxis = parseInt(els.xaxis.options[els.xaxis.selectedIndex].value);
    var yaxis = parseInt(els.yaxis.options[els.yaxis.selectedIndex].value);
    //only specify the axes if they were previously set (via the dropdowns)
    //or if they are now set to 1, likely to happen if they remove an axis this
    //series was previously using
    if (serie.xaxis || xaxis != 1)
        serie.xaxis = xaxis;
    if (serie.yaxis || yaxis != 1)
        serie.yaxis = yaxis;
    if (!els.show.checked)
        serie.hide = true;
}

//by default there is only x/y axes, allow them to add an arbitrary number of axes instead
function addAxesButtons(){
    var form = $(document.forms.global);
    var fsX = $(document.createElement('fieldset')).append('<legend>Axes</legend>');

    $(document.createElement('button')).text('Add X Axis').appendTo(fsX).click(function(){
        addAxisData(form,fsX,'x',xAxes,specs.xaxis);
        return false;
    });
    $(document.createElement('button')).text('Add Y Axis').appendTo(fsX).click(function(){
        addAxisData(form,fsX,'y',yAxes,specs.yaxis);
        return false;
    });

    form.prepend(fsX);
    addAxisForm(form,specs.xaxis,'xaxis');
    addAxisForm(form,specs.yaxis,'yaxis');
}

function addAxisData(form,fsX,type,axes,spec){
    var index = axes.length+1;
    var newAxis = $.extend(true,{},spec,{ 
        _options: {
            title: spec._options.title+' #'+index
        }
    });
    axes.push(newAxis);
    addAxisForm(form,newAxis,type+'axis'+index);
    $('select[name="'+type+'axis"]').append('<option value="'+index+'">'+index+'</option>');
    if (axes.length == 2){
        $(document.createElement('button')).attr('id',type+'axis-removal').appendTo(fsX).click(function(){
            //find any series using this axis and flip them back to value = 1
            $('select[name="'+type+'axis"] option[value="'+axes.length+'"]:selected').each(function(e){
                $(this).siblings('option[value=1]').attr('selected',true);
            });
            $('select[name="'+type+'axis"] option[value="'+axes.length+'"]').remove();
            $('.'+type+'axis'+axes.length).remove();
            axes.splice(axes.length-1,1);
            if (axes.length == 1)
                $(this).remove();
            else
                $(this).text('Remove '+type+' axis '+axes.length);
            draw();
            return false;
        });
    }
    $('#'+type+'axis-removal').text('Remove '+type+' axis '+index);
    return false;
}

//add the actual form to the global options
function addAxisForm(form,axis,name){
    var o = axis;
    var opt = o._options;
    
    var legend = $(document.createElement('legend')).html('<a href="javascript:;">' + opt.title + '</a>'),
        fieldset = $(document.createElement('legend')).addClass(name+' removeable').append(legend),
        container = $(document.createElement('span'));
        
    fieldset.append(container);
    form.append(fieldset);
    legend.click(function(){ container.toggle();});
    
    if (opt.collapsed) container.hide();

    $.each(o,function(k,v){
        if (v && k != '_options'){
            insertElement(v, k, name + '-' + k, container);
        }
    });

    form.find('input,select,textarea').each(function(e){
        $(this).change(draw);
    });
}

function buildDataForms(){
  var i, k, a, values, entries, fieldsetData, fieldsetSerie, formData, formOptions, formSerie;
    $.each(data,function(i,serie){ 
        fieldsetData = $(document.createElement('fieldset')).append('<legend>Data</legend>');
        fieldsetSerie = $(document.createElement('fieldset')).append('<legend>Options</legend>');
    
        formData = $(document.createElement('form')).attr('name',serie.id + '-data').append(fieldsetData);
    
        formOptions = $(document.createElement('form')).attr('name',serie.id + '-options').css('clear','both');
        
        formSerie = $(document.createElement('form')).attr('name',serie.id + '-serie').css('clear','both').addClass('serie-options').append(fieldsetSerie);
        
        var container = $(document.createElement('div')).attr('id',serie.id).addClass('removeable').append(formSerie).append(formData).append(formOptions).appendTo('#configurator');
        
        serie.toJSON = function(){
            values = [];
            for (k in serie) {
                if (k != 'toJSON' && k != 'id' && k != 'hide' && this[k] !== null) {
                    entries = [];
                    if ($.isArray(this[k])) {
                        a = this[k];
                        for (i = 0; i < a.length; i++) {
                            entries.push(JSON.stringify(a[i]));
                        }
                        str = 'data:<br /> [' + entries.join(',<br />') + ']';
                    }
                    else {
                        str = k + ': ' + JSON.stringify(this[k]);
                    }
                    values.push(str);
                }
            }
            return '<br />{' + values.join(', ') + '}<br />';
        }
        
        for (i = 0; i < serie.data.length; i++) {
            fieldsetData.append(getDataInputs(serie.data[i],2));
        }
        fieldsetSerie.append('<div class="axis-select">' +
        'x Axis :' +
        '<label><select name="xaxis"><option value="1">1</option></select></label>' +
        '<br />y Axis :' +
        '<label><select name="yaxis"><option value="1">1</option></select></label></div>' +
        '<input type="text" value="' + serie.label + '" name="label" size="14" /> '+
        '<input type="text" value="' + (serie.color?serie.color:'') + '" name="color" size="8" /><div class="wheel"></div><br />' +
        '<label><input type="checkbox" checked="checked" name="show" /> Show</label>');
        fieldsetData.append('<a href="javascript:;" class="plus" onclick="$(this).before(getDataInputs(null,2))">+</a>');
        
        var xaxis = fieldsetSerie.find('select[name="xaxis"]');
        var yaxis = fieldsetSerie.find('select[name="yaxis"]');
        var wheel = fieldsetSerie.find('div.wheel');
        var input = fieldsetSerie.find('input[name="color"]');
        $(wheel).farbtastic(input).hide();
        input.focus(function(){
            $(wheel).show();
        }).blur(function(){
            $(wheel).hide();
            $(input).change();
        });

        //add appropriate axes to each select
        for (var i = 1;i < xAxes.length;i++){
            xaxis.append('<option value="'+(i+1)+'">'+(i+1)+'</option>');
        }
        for (var i = 1;i < yAxes.length;i++){
            yaxis.append('<option value="'+(i+1)+'">'+(i+1)+'</option>');
        }

        buildForm(specs, formOptions);
    
        formOptions.find('input,select,textarea').each(function(i,e){
            $(this).change(draw);
        });
        
        formSerie.find('input,select,textarea').each(function(i,e){
            $(this).change(draw);
        });
        
        // Add the data tab
        $('#tabs ul').append('<li class="removeable"><a href="#' + serie.id + '">' + serie.label + '</a></li>');
    });
}

function main(){
    buildForm(specs, $(document.forms.global));
    addAxesButtons();
    
    $('input,select,textarea',document.forms.global).each(function(e){
        $(this).change(draw);
    });

  buildDataForms();
    
    $('#tabs').tabs();
    $('#tabs-io').tabs();
    draw();
}

$(document).ready(function(){
    main();
});
