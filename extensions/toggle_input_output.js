IPython.toolbar.add_buttons_group([
	
	// Toggle current input cell
    {
    	'id'      : 'toggle_current_input_cell',
		'label'   : 'Show/hide current input cell',
		'icon'    : 'fa-angle-up',
		'callback': function(){
        	// Find the selected cell
        	var cell = IPython.notebook.get_selected_cell();
	        // Toggle visibility of the input div
	        cell.element.find("div.input").toggle('slow')
	        if ( cell.metadata.input_collapsed ) {
	          cell.metadata.input_collapsed = false;
	        } else {
	          cell.metadata.input_collapsed = true;
	        }
		}
    },

    // Toggle input
    {
    	'id'      : 'toggle_input',
		'label'   : 'Show/hide all input cells',
		'icon'    : 'fa-angle-double-up', //'fa-sign-in',
		'callback': function(){
        	//$('.input').slideToggle() // remove code cells (slide)
        	$('#notebook').find('.input').slideToggle(); // remove code cells (slide)
		}
    },

    // Toggle output
    {
    	'id'      : 'toggle_output',
  		'label'   : 'Show/hide all output cells',
  		'icon'    : 'fa-angle-double-down', //'fa-sign-out',
  		'callback': function(){
    		$('#notebook').find('.output').slideToggle(); // remove output cells
  		}
    },

    // Toggle current output cell
    {
    	'id'      : 'toggle_current_output_cell',
        'label'   : 'Show/hide current output cell',
        'icon'    : 'fa-angle-down',
        'callback': function(){
        	// Find the selected cell
            var cell = IPython.notebook.get_selected_cell();
            // Toggle visibility of the input div
            cell.element.find("div.output").toggle('slow')
            if ( cell.metadata.output_collapsed ) {
              cell.metadata.output_collapsed = false;
            } else {
              cell.metadata.output_collapsed = true;
            }
        }
    },

])
