IPython.toolbar.add_buttons_group([

  // Create table of contents
  // ========================
  {
    'label'   : 'Create table of contents (no links)',
    'icon'    : 'fa-list',
    'callback': function(){

      IPython.notebook.insert_cell_at_index('code', 0);
      var toc = '# ' + window.document.getElementById("notebook_name").innerHTML
                + '\n---\n## Table of Contents\n'
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
                var [[level1, level2, level3], toc] = addToTOC(titleToLevel(title), [level1, level2, level3], trimTitle(title), toc);
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
  }
])

console.log("Custom TOC button loaded successfully!");
