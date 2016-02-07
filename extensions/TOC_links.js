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

      IPython.notebook.insert_cell_at_index('code',0);
      var toc = '# <span style="font-size: 1.6em;">' + window.document.getElementById("notebook_name").innerHTML
                + '</span><a id="top"></a>\n---\n## Table of Contents\n'
      var level  = 0;
      var level1 = 0; // counter for level 1
      var level2 = 0; // counter for level 2
      var level3 = 0; // counter for level 3
      var txt       = '';
      var txt_clean = '';
      var orig_txt  = '';
      var tag       = '';
      var idx       = 0;
      var edit_markdown = false;
      for (var i = 0; i < IPython.notebook.ncells(); i++) {

          var curr = IPython.notebook.get_cell(i);

          if (curr.cell_type != 'markdown') {continue;}


          // Read text and prepare it
          // ------------------------

          txt = curr.get_text();
          orig_txt = txt;

          // Clean up string
          txt = txt.replace(/^\s*\n/g, ''); // remove empty lines from the beginning
          txt = txt.split(/\n/g)[0]; // keep everything before the line break

          //txt = txt.replace(/^(\s+)|(\s+)$/g,''); 
          txt = txt.trim() // remove leading and trailing spaces

          txt_clean = txt


          var istitle = txt.match(/^#+/g, '');
          if (istitle) {
           level = istitle[0].length;
          } else { // not a title
            continue;
          }

          txt = txt.replace(/^#+\s*/g, ''); // remove all "#" and the spaces from the beginning

          if (txt.substring(0, 3) == '---') {continue;} // skip line that contains "#---"


          // Create table of contents
          // ------------------------
          // If an indentation is added, the link won't work
          
          if (level == 1) {

            level1 += 1;
            level2 = 0;
            level3 = 0;
            
            tag = 'level' + level1 + '.' + level2 + '.' + level3;
            toc += '### ' + level1 + '. [' + txt + '](#' + tag + ')\n';

            edit_markdown = true;

          } else if (level == 2) {

            level2 += 1;
            level3 = 0;
            
            tag = 'level' + level1 + '.' + level2 + '.' + level3;
            toc += '#### ' + level1 + '.' + level2 + '. [' + txt + '](#' + tag + ')\n';

            edit_markdown = true;

          } else if (level == 3) {

            level3 += 1;
            
            tag = 'level' + level1 + '.' + level2 + '.' + level3;
            toc += '##### ' + level1 + '.' + level2 + '.' + level3 + '. [' + txt + '](#' + tag + ')\n';

            edit_markdown = true;

          }


          // Edit original text
          // ------------------
          if (edit_markdown) {
            edit_markdown = false
            // idx = txt_clean.search(/[^#]/g); // position of the last "#"
            idx = txt_clean.match(/^(#+)\s?/g)[0].length; // find the end of the pattern "##...## ..." in the beginning
            txt_clean = txt_clean.slice(0, idx) + '[' + txt_clean.slice(idx);
            if (txt_clean.indexOf("\n") >= 0) { // there is a newline character
              txt_clean = txt_clean.replace("\n", "](#top)<a id='" + tag + "'></a>\n");
            } else {
              txt_clean = txt_clean + "](#top)<a id='" + tag + "'></a>";
            }
            curr.set_text(txt_clean);
            curr.execute();
          }

      }
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

      var orig_txt = '';
      var txt = '';
      var pos = 0;
      var idx1 = '';
      var idx2 = '';
      for (var i = 0; i < IPython.notebook.ncells(); i++) {

          var curr = IPython.notebook.get_cell(i);

          if (curr.cell_type != 'markdown') {continue;}


          // Read text and prepare it
          // ------------------------

          orig_txt = curr.get_text();

          // Remove the link that possibly was created by the TOC button
          txt = orig_txt.replace(/\]\(#top\)<a id=.*<\/a>/g, '') // remove end
          if (txt == orig_txt) {continue;} // couldn't find link

          idx1 = txt.match(/^#+ /g); // find the end of the # in the beginning
          idx2 = txt.match(/^(#+) \[+/g); // find the end of the pattern "##...##spaces[[[..." in the beginning
          if (!idx1 || !idx2) {continue;} // couldn't find pattern "##...## ["
          txt = idx1 + txt.slice(idx2[0].length); // remove beginning


          // Edit original text
          // ------------------
          curr.set_text(txt);
          curr.execute();

      }}}])
