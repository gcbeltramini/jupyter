IPython.toolbar.add_buttons_group([

  // Create table of contents
  {
    'label'   : 'Create table of contents (no links)',
    'icon'    : 'fa-list',
    'callback': function(){
      IPython.notebook.insert_cell_at_index('code',0);
      var toc = '# <span style="font-size: 1.6em;">' + window.document.getElementById("notebook_name").innerHTML
                + '\n---\n## Table of Contents\n'
      var level  = 0;
      var level1 = 0; // counter for level 1
      var level2 = 0; // counter for level 2
      var level3 = 0; // counter for level 3
      var txt    = '';
      for (var i = 0; i < IPython.notebook.ncells(); i++) {

          var curr = IPython.notebook.get_cell(i);

          if (curr.cell_type != 'markdown') {continue;}


            // Read text and prepare it
            // ------------------------

            txt = curr.get_text();

            // Clean up string
            txt = txt.replace(/^\s*\n/g, ''); // remove empty lines from the beginning
            txt = txt.split(/\n/g)[0]; // keep everything before the line break

            //txt = txt.replace(/^(\s+)|(\s+)$/g,''); 
            txt = txt.trim() // remove leading and trailing spaces

            var istitle = txt.match(/^#+/g, '')
            if (istitle) {
             level = istitle[0].length
            } else { // not a title
              continue;
            }

            txt = txt.replace(/^#+\s*/g, ''); // remove all "#" and the spaces from the beginning

            if (txt.substring(0, 3) == '---') {continue;} // skip line that contains "#---"


            // Create table of contents
            // ------------------------

            if (level == 1) {

              level1 += 1;
              level2 = 0;
              level3 = 0;
              toc += '### ' + level1 + '. ' + txt + '\n'

            } else if (level == 2) {

              level2 += 1;
              level3 = 0;
              toc += '    ' + level1 + '.' + level2 + '. ' + txt + '\n'; // indentation
              //toc += '#### ' + level1 + '.' + level2 + '. ' + txt + '\n'; // bold font
              // It's either bold font or with indentation

            } else if (level == 3) {

              level3 += 1;
              toc += '        ' + level1 + '.' + level2 + '.' + level3 + '. ' + txt + '\n';
              //toc += '    ' + level1 + '.' + level2 + '.' + level3 + '. ' + txt + '\n';
              // The second row is associated with the second row in level2; equivalently for the first row

            }
        }
        toc = toc.substring(0, toc.length - 1); // remove the last line break
        IPython.notebook.get_cell(0).set_text(toc);
        IPython.notebook.to_markdown(0);
        IPython.notebook.get_cell(0).execute();
        IPython.notebook.scroll_to_top();
    }}])
