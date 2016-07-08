IPython.toolbar.add_buttons_group([

  // Create table of contents (with links)
  // =====================================
  {
    'label'   : 'Create table of contents with links',
    'icon'    : 'fa-list',
    'callback': function(){

      if (!confirm("This will edit the markdown cells with titles to create links. \
If you wish to restore the changes, use the unlink button. Do you want to continue?")) {
        return;
      }

      IPython.notebook.save_notebook(); // save the notebook before making changes

      IPython.notebook.insert_cell_at_index('code', 0);
      var toc = '# ' + window.document.getElementById("notebook_name").innerHTML
                + '<a id="top"></a>\n---\n## Table of Contents\n'
      var level1 = 0; // counter for level 1
      var level2 = 0; // counter for level 2
      var level3 = 0; // counter for level 3
      for (var cc = 0; cc < IPython.notebook.ncells(); cc++) {

          var curr = IPython.notebook.get_cell(cc);

          if (curr.cell_type != 'markdown') continue;

          // Read text
          // ---------
          var txt = curr.get_text();

          // Loop over the titles
          // --------------------
          titles = findTitles(txt);
          for (var tt = 0; tt < titles.length; tt++) {
              var title = titles[tt];
              var [[level1, level2, level3], tag, toc, edit_markdown] = addToTOC_links(titleToLevel(title), [level1, level2, level3], trimTitle(title), toc);
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
      IPython.notebook.get_cell(0).set_text(toc);
      IPython.notebook.to_markdown(0);
      IPython.notebook.get_cell(0).execute();
      IPython.notebook.scroll_to_top();
    }
  },


  // Remove the links created by the function above
  // ==============================================
  {
    'label'   : 'Unlink: remove links created with the TOC button',
    'icon'    : 'fa-unlink',
    'callback': function(){

      if (!confirm("This will edit the markdown cells with titles to remove the links. \
If you wish to restore the changes, create a backup copy of the IPython notebook. Do you want to continue?")) {
        return;
      }

      IPython.notebook.save_notebook(); // save the notebook before making changes

      var idx1 = '';
      var idx2 = '';
      for (var i = 0; i < IPython.notebook.ncells(); i++) {

          var curr = IPython.notebook.get_cell(i);

          if (curr.cell_type != 'markdown') continue;

          // Read text
          // ---------
          var txt = curr.get_text();

          // Loop over the titles
          // --------------------
          titles = findTitles(txt);
          for (var tt = 0; tt < titles.length; tt++) {
              var title = titles[tt];
              var no_link = removeLink(title);
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
