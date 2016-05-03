# Usage notes

Sass:
install ruby and sass
Add a file watcher
arguments: --no-cache --update ../scss/$FileName$:../css/$FileNameWithoutExtension$.css
output paths: ../css/$FileNameWithoutExtension$.css

Template usage:
install node
run  'node app.js'
either navigate to in browser /template.html#<path_to_your_file>
or
put <script src="/js/load.js"></script> in top of your file and navigate to it in browser

Only body content is loaded, so put you extra css in a different scss file.
Avoid including scripts
