IPython.toolbar.add_buttons_group([
	{
		'id' : 'toggle_prompt',
		'label' : 'Show/hide In[x], Out[x]',
		'icon' : 'fa-toggle-left',
		'callback': function(){
			$('#notebook').find('.prompt').toggle(); // toggle prompt (In[x], Out[x])
			}
	}])
