var events = require('base/js/events');

Jupyter.keyboard_manager.command_shortcuts.add_shortcut('Alt-h', {
    help : 'toggle header',
    help_index : 'zz',  // last position
    handler : function (event) {
        $('div#header-container').toggle();  // Jupyter logo, notebook title
        $('.header-bar').toggle();  // div separating header and menu bar

        // Adjust the height of the notebook inside the window
        // Jupyter.menubar._size_header();  // deprecated
        events.trigger('resize-header.Page');
    }
});

Jupyter.keyboard_manager.command_shortcuts.add_shortcut('Alt-m', {
    help : 'toggle menu bar',
    help_index : 'zz',  // last position
    handler : function (event) {
        $('div#menubar-container').toggle();  // contains the menu bar and the toolbar

        // To toggle them individually:
        // $('div#menubar').toggle();  // toggles only the menu bar
        // $('div#maintoolbar').toggle();  // toggles only the toolbar

        // Adjust the height of the notebook inside the window
        // Jupyter.menubar._size_header();  // deprecated
        events.trigger('resize-header.Page');
    }
});

console.log("Custom shortcuts to toggle the menu bar and toolbar loaded successfully!");
