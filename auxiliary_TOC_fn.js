// Auxiliary functions
// ===================

function findTitles(txt) {
    return txt.match(/^#+ (.*)/gm) || [];
}

function titleToLevel(title) {
    return title.match(/^#+/g, '')[0].length;
}

function trimTitle(title) {
    return title.replace(/^#+/, '').trim();
}

function createTag(level1, level2, level3) {
    return 'level' + level1 + '.' + level2 + '.' + level3;
}

function addToTOC_links(level, level_count, title, toc) {

    var edit_markdown = [1, 2, 3].indexOf(level) >= 0;
    var [level1, level2, level3] = level_count;

    if (level == 1) {

        level1 += 1;
        level2 = 0;
        level3 = 0;
        var tag = createTag(level1, level2, level3);
        toc += '### ' + level1 + '. [' + title + '](#' + tag + ')\n';

    } else if (level == 2) {

        level2 += 1;
        level3 = 0;
        var tag = createTag(level1, level2, level3);
        toc += '&emsp;&emsp;' + level1 + '.' + level2 + '. [' + title + '](#' + tag + ')<br>\n';
        // If spaces are added, the link won't work

    } else if (level == 3) {

        level3 += 1;
        var tag = createTag(level1, level2, level3);
        toc += '&emsp;&emsp;&emsp;&emsp;' + level1 + '.' + level2 + '.' + level3 + '. [' + title + '](#' + tag + ')<br>\n';
        // If spaces are added, the link won't work

    } else {
        var tag = '';
    }
    return [[level1, level2, level3], tag, toc, edit_markdown];
}

function addToTOC(level, level_count, title, toc) {

    var [level1, level2, level3] = level_count;

    if (level == 1) {

        level1 += 1;
        level2 = 0;
        level3 = 0;
        toc += '### ' + level1 + '. ' + title + '\n'

    } else if (level == 2) {

        level2 += 1;
        level3 = 0;
        toc += '    ' + level1 + '.' + level2 + '. ' + title + '\n'; // indentation
        //toc += '#### ' + level1 + '.' + level2 + '. ' + title + '\n'; // bold font
        // It's either bold font or with indentation

    } else if (level == 3) {

        level3 += 1;
        toc += '        ' + level1 + '.' + level2 + '.' + level3 + '. ' + title + '\n';
        //toc += '    ' + level1 + '.' + level2 + '.' + level3 + '. ' + title + '\n';
        // The second row is associated with the second row in level2; equivalently for the first row

    }
    return [[level1, level2, level3], toc];
}

function titleToLink(title, tag) {
    // var idx = title.search(/[^#]/g); // position of the last "#"
    var idx = title.match(/^(#+)\s?/)[0].length; // find the end of the pattern "##...## ..." in the beginning
    return title.slice(0, idx) + '[' + title.slice(idx) + '](#top)<a id="' + tag + '"></a>';
}

function escapeSpecialCharacters(txt) {
    return txt.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function replaceLine(txt, line, to_replace) {
    return txt.replace(new RegExp('\^' + escapeSpecialCharacters(line) + '\$', 'm'), to_replace);
}

function removeLink(title) {
    // Remove the link that possibly was created by the TOC button

    var no_link = title.match(/^#+ \[+(.*?)\]\(#top\)<a id=.+<\/a>$/);
    if (no_link == null) return title;
    return title.match(/^#+ /)[0] + no_link[1];
}



// Tests
// =====

// Run the tests with
// test_findTitles();
// test_titleToLevel();
// test_trimTitle();
// test_addToTOC_links();
// test_addToTOC();
// test_titleToLink();
// test_replaceLine();
// test_removeLink();

// function assertArraysEqual(a, b) {
//     if (a === b) return true;
//     if (a == null || b == null) return false;
//     if (a.length != b.length) return false;
//     for (var i = 0; i < a.length; ++i) {
//         if (a[i].constructor === Array) {
//             if (!assertArraysEqual(a[i], b[i])) return false;
//         } else if (a[i] !== b[i]) return false;
//     }
//     return true;
// }

// function test_findTitles() {
//     var tests = [
//         // txt => titles
//         ["#  Title 1  ", ["#  Title 1  "]],
//         [" # nothing \n#no\n# Title1  \n##   Title2 \nfoo\n### Title 3", ["# Title1  ", "##   Title2 ", "### Title 3"]],
//         [" No title", []]
//     ];
//     console.log('Running tests for findTitles...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [txt, titles] = tests[ii];
//         var actual_output = findTitles(txt);
//         if (!assertArraysEqual(actual_output, titles)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(titles);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_titleToLevel() {
//     var tests = [
//       // title => level
//       ["##  Title", 2],
//       ["#### title", 4]
//     ];
//     console.log('Running tests for titleToLevel...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [title, level] = tests[ii];
//         var actual_output = titleToLevel(title);
//         if (!assertArraysEqual(actual_output, level)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(level);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_trimTitle() {
//     var tests = [
//       // title => trimmed
//       ["##  Title  t    ", "Title  t"],
//       ["#### title foo  ", "title foo"]
//     ];
//     console.log('Running tests for trimTitle...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [title, trimmed] = tests[ii];
//         var actual_output = trimTitle(title);
//         if (!assertArraysEqual(actual_output, trimmed)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(trimmed);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_addToTOC_links() {
//     var tests = [
//         // level, level_count, title,          toc       => output
//         [1,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [7, 0, 0], "level7.0.0", "TOC\n### 7. [  A  Title  ](#level7.0.0)\n", true]],
//         [2,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 3, 0], "level6.3.0", "TOC\n&emsp;&emsp;6.3. [  A  Title  ](#level6.3.0)<br>\n", true]],
//         [3,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 2, 10], "level6.2.10", "TOC\n&emsp;&emsp;&emsp;&emsp;6.2.10. [  A  Title  ](#level6.2.10)<br>\n", true]],
//         [4,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 2, 9], "", "TOC\n", false]],
//     ];
//     console.log('Running tests for addToTOC_links...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [level, level_count, title, toc, output] = tests[ii];
//         var actual_output = addToTOC_links(level, level_count, title, toc);
//         if (!assertArraysEqual(actual_output, output)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(output);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_addToTOC() {
//     var tests = [
//         // level, level_count, title,          toc       => output
//         [1,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [7, 0, 0], "TOC\n### 7.   A  Title  \n"]],
//         [2,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 3, 0], "TOC\n    6.3.   A  Title  \n"]],
//         [3,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 2, 10], "TOC\n        6.2.10.   A  Title  \n"]],
//         [4,       [6, 2, 9],   "  A  Title  ", "TOC\n", [
//             [6, 2, 9], "TOC\n"]],
//     ];
//     console.log('Running tests for addToTOC...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [level, level_count, title, toc, output] = tests[ii];
//         var actual_output = addToTOC(level, level_count, title, toc);
//         if (!assertArraysEqual(actual_output, output)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(output);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }


// function test_titleToLink() {
//     var tests = [
//       // title,        tag             => link
//       ["#  My title  ", "level9.7.5", '# [ My title  ](#top)<a id="level9.7.5"></a>'],
//       ["# My title  2", "level10.7.5", '# [My title  2](#top)<a id="level10.7.5"></a>']
//     ];
//     console.log('Running tests for titleToLink...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [title, tag, link] = tests[ii];
//         var actual_output = titleToLink(title, tag);
//         if (!assertArraysEqual(actual_output, link)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(link);
//             console.log('  Actual output');
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_replaceLine() {
//     var tests = [
//       // txt, line, to_replace => new_txt
//       ['line 0', 'line 0', 'abc', 'abc'],
//       ['line 0\n line 1\nline 1', 'line 1', 'xxx', 'line 0\n line 1\nxxx'],
//       ['line 0\nline 1\nline 1', 'line 1', 'XXX', 'line 0\nXXX\nline 1'],
//       ['line 0', 'line', 'xxx', 'line 0'],
//       ['line 0\nline -[]{}()*+?.\\/^$|\nline 2', 'line -[]{}()*+?.\\/^$|', 'xxx', 'line 0\nxxx\nline 2']
//     ];
//     console.log('Running tests for replaceLine...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [txt, line, to_replace, new_txt] = tests[ii];
//         var actual_output = replaceLine(txt, line, to_replace);
//         if (!assertArraysEqual(actual_output, new_txt)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(new_txt);
//             console.log('  Actual output')
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }

// function test_removeLink() {
//     var tests = [
//       // title => no_link
//       ['# [  Title 1 - 1 txt ](#top)<a id="level11.33.55"></a>', '#   Title 1 - 1 txt '],
//       ['### [   [T]i(tl)e {3.1}/txt](#top)<a id="level77.88.999"></a>', '###    [T]i(tl)e {3.1}/txt'],
//       ['## [[[ Title (2) - |=* ](#top)<a id="level1.1.0"></a>](#top)<a id="level2.1.0"></a>](#top)<a id="level3.1.0"></a>', '##  Title (2) - |=* ']
//     ];
//     console.log('Running tests for removeLink...');
//     for (var ii = 0; ii < tests.length; ii++) {
//         var [title, no_link] = tests[ii];
//         var actual_output = removeLink(title);
//         if (!assertArraysEqual(actual_output, no_link)) {
//             console.log('  Test ' + ii + ' failed!');
//             console.log('  Expected:');
//             console.log(no_link);
//             console.log('  Actual output')
//             console.log(actual_output);
//         } else {
//             console.log('  Test ' + ii + ' passed!');
//         }
//     }
// }
