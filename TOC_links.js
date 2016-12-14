var CONFIRMATION_MESSAGE = "This will edit the markdown cells with titles to remove the links." +
                           " If you wish to restore the changes, create a backup copy of the Jupyter notebook." +
                           " Do you want to continue?"

Jupyter.toolbar.add_buttons_group([

  // Create table of contents (with links)
  // =====================================
  {
    'label'   : 'Create table of contents with links',
    'icon'    : 'fa-list',
    'callback': function(){

      if (!confirm(CONFIRMATION_MESSAGE)) return;

      Jupyter.notebook.save_notebook(); // save the notebook before making changes

      Jupyter.notebook.insert_cell_at_index('code', 0);

      // Initalize variables
      // -------------------
      var toc = '# ' + window.document.getElementById("notebook_name").innerHTML +
                '<a id="top"></a>\n---\n## Table of Contents\n',
          level1, level2, level3, // counter for levels 1, 2 and 3
          txt, title, tag,
          edit_markdown = false;
      level1 = level2 = level3 = 0;
      txt = title = tag = "";

      for (var cc = 0; cc < Jupyter.notebook.ncells(); cc++) {

          var curr = Jupyter.notebook.get_cell(cc);

          if (curr.cell_type != 'markdown') continue;

          // Read text
          // ---------
          txt = curr.get_text();

          // Loop over the titles
          // --------------------
          titles = findTitles(txt);
          for (var tt = 0; tt < titles.length; tt++) {
              title = titles[tt];
              [[level1, level2, level3], tag, toc, edit_markdown] = addToTOC_links(titleToLevel(title),
                                                                                          [level1, level2, level3],
                                                                                          trimTitle(title),
                                                                                          toc);
              if (edit_markdown) {
                  txt = replaceLine(txt, title, titleToLink(title, tag));
              }
          }

          // Edit cell
          // ---------
          if (titles.length) {
              curr.set_text(txt);
              curr.execute();
          }
      }

      // Insert TOC at the beginning
      // ---------------------------
      toc = toc.substring(0, toc.length - 1); // remove the last line break
      Jupyter.notebook.get_cell(0).set_text(toc);
      Jupyter.notebook.to_markdown(0);
      Jupyter.notebook.get_cell(0).execute();
      Jupyter.notebook.scroll_to_top();
    }
  },


  // Remove the links created by the function above
  // ==============================================
  {
    'label'   : 'Unlink: remove links created with the TOC button',
    'icon'    : 'fa-unlink',
    'callback': function(){

      if (!confirm(CONFIRMATION_MESSAGE)) return;

      Jupyter.notebook.save_notebook(); // save the notebook before making changes

      // Initalize variables
      // -------------------
      var txt, title, no_link;
      txt = title = no_link = '';

      for (var i = 0; i < Jupyter.notebook.ncells(); i++) {

          var curr = Jupyter.notebook.get_cell(i);

          if (curr.cell_type != 'markdown') continue;

          // Read text
          // ---------
          txt = curr.get_text();

          // Loop over the titles
          // --------------------
          var titles = findTitles(txt);
          for (var tt = 0; tt < titles.length; tt++) {
              title = titles[tt];
              no_link = removeLink(title);
              if (title != no_link) {
                  txt = replaceLine(txt, title, no_link);
              }
          // Edit cell
          if (titles.length) {
              curr.set_text(txt);
              curr.execute();
          }}
      }
    }
  }
])

console.log("Custom TOC (with links) button loaded successfully!");
