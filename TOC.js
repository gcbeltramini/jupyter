Jupyter.toolbar.add_buttons_group([

  // Create table of contents
  // ========================
  {
    'label'   : 'Create table of contents (no links)',
    'icon'    : 'fa-list',
    'callback': function(){

      // Initalize variables
      // -------------------
      var toc = '# ' + window.document.getElementById("notebook_name").innerHTML +
                '\n---\n## Table of Contents\n',
          level1, level2, level3, // counter for levels 1, 2 and 3
          txt, title;
      level1 = level2 = level3 = 0;
      txt = title = "";

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
          [[level1, level2, level3], toc] = addToTOC(titleToLevel(title),
                                                     [level1, level2, level3],
                                                     trimTitle(title),
                                                     toc);
        }
      }

      // Insert TOC at the beginning
      // ---------------------------
      toc = toc.substring(0, toc.length - 1); // remove the last line break
      Jupyter.notebook.insert_cell_at_index('code', 0);
      Jupyter.notebook.get_cell(0).set_text(toc);
      Jupyter.notebook.to_markdown(0);
      Jupyter.notebook.get_cell(0).execute();
      Jupyter.notebook.scroll_to_top();
    }
  }
])

console.log("Custom TOC button loaded successfully!");
