/*

INSTALLATION
============
To install the extensions, copy the file custom.js to folder ~/.jupyter/custom
To install each extension, copy each js file to folder ~/.jupyter/custom


REFERENCES
==========
 
 There is a list of icons here:
 - http://fortawesome.github.io/Font-Awesome/cheatsheet/
 - http://astronautweb.co/snippet/font-awesome/
 
 Some other cool IPython notebook extensions:
 - https://github.com/ipython-contrib/IPython-notebook-extensions


To write custom javascript functions. Explore the object properties with:

var cell = IPython.notebook.get_selected_cell();
console.log(Object.keys(cell).sort());
console.log(Object.getOwnPropertyNames(cell).sort());

Or use the autocomplete in the code editor.

 */


$([Jupyter.events]).on('app_initialized.NotebookApp', function(){
    require([
    	'/custom/toggle_prompt_input_output.js',
    	'/custom/auxiliary_TOC_fn.js',
    	'/custom/TOC.js',
    	'/custom/TOC_links.js',
    	'/custom/toggle_menu.js'
    	])
});
