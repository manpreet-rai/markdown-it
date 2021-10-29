let sample = '# Chapter Name{#chapter-name .title}\n' +
    'Chapter name must be the title of the post. Make sure, #chapter-name (see its all lowercase and each word is separated by hyphen - ) is used as #id and be sure to include .title as class in curly braces. There is no space between Chapter Name and curly braces.{.paragraph} \n' +
    '\n' +
    'Only 1 #id can be used but multiple .classes are allowed, each separated by a space for example .class-1 .class-2 ... class-n{.note}\n' +
    '\n' +
    'There are 4 levels of hierarchy:-{.paragraph}\n' +
    '1. .title -> Largest Text - for chapter names only (as seen above)\n' +
    '2. .heading -> Larger Text - for all section headings except chapter name (see below)\n' +
    '3. .subheading -> Large Text - for all subsections only (see below)\n' +
    '4. .paragraph -> Normal Text - for all paragraphs (as seen above)\n' +
    '\n' +
    '{.inside}\n' +
    '\n' +
    'Don\'t worry about this `{.inside}` class, it will be discussed below later.{.paragraph}\n' +
    '\n' +
    '## Section One{#section-one .heading}\n' +
    'This section contains one line as an example.{.paragraph}\n' +
    '\n' +
    '### Subsection One {#subsection-one .subheading}\n' +
    'To create multiple paragraphs, use an empty line below the paragraph. Also end every paragraph with `.paragraph` class just like this.{.paragraph}\n' +
    '\n' +
    'This is a second paragraph.{.paragraph}\n' +
    '\n' +
    '## Images{#images .heading}\n' +
    'Images are easy to use. To see preview of the image, use the format `[Image Description](https://url)`. You can also use `.h-center` to horizontally center an image.{.paragraph}\n' +
    '\n' +
    '![Alt](https://aryxo.com/logo-small.png){.h-center}\n' +
    '\n' +
    'Instead of using links for images in chapter for Aryxo, upload the image to github repository and use the name of file as shown below carefully, just copy this line and edit out the name of course/filename. Use **@include(\'figures/course/chapter-m-fig-n\')** only\n' +
    '{.warning}\n' +
    '\n' +
    '## Captions{.heading}\n' +
    'To use captions below an image or above a table, use `[Caption here]{.caption}` and `{.center}` below the caption to horizontally center the caption.{.paragraph}\n' +
    '\n' +
    '[Image Description]{.caption}\n' +
    '{.center}\n' +
    '\n' +
    '## Code{.heading}\n' +
    'Code can be Inline or Block. Let\'s look at these one by one.{.paragraph}\n' +
    '\n' +
    '### Inline{.subheading}\n' +
    'To use an excerpt or a few words of code in a line, wrap the code in backticks ( \\` - ignore the slash, it\'s used for escaping here). This text will be given a mono font and is treated as inline code. For example, look at this code in preview `int main()`.{.paragraph}\n' +
    '\n' +
    'Incase you need to use backtick for any purpose, escape it using backslash in front of it.{.paragraph}\n' +
    '\n' +
    '### Block{.subheading}\n' +
    'Any block of code can be wrapped inside 3 backticks followed by the language name ( \\```language - ignore the slash, it\'s used for escaping here). Language name can be `bash, c, c++, java, python, html, css and js` for now. You can also use `nothing` as language name, in case no language is used.{.paragraph}\n' +
    '\n' +
    'Filename can be specified above the code block using `.filename` class. This is required when referring to multiple files in a program.{.paragraph}\n' +
    '\n' +
    'See the example C program written in `hello.c` file as below. After the code, output is also shown using `.nothing` as a language. You can also use `.output` class alone for just showing the output text.{.paragraph}\n' +
    '\n' +
    'hello.c{.filename}\n' +
    '```c\n' +
    '#include<stdio.h>\n' +
    '\n' +
    'int main(int argc, char **argv) {\n' +
    '    printf("Hello World\\n");\n' +
    '    return 0;\n' +
    '}\n' +
    '```\n' +
    '```nothing\n' +
    'output> Hello World\n' +
    '```\n' +
    '\n' +
    '## Other Markdown Features{.heading}\n' +
    'This Aryxo edition markdown supports all the features of Github Flavoured Markdown and has added even more. Let\'s look at them one by one.{.paragraph}\n' +
    '\n' +
    '### Bold Text{.subheading}\n' +
    'To bold certain parts of the text, wrap the text between `**` or `__` and the resulting text will be bold.{.paragraph} \n' +
    '\n' +
    'For example, **this text is quite bold** and __so is this__.{.paragraph}\n' +
    '\n' +
    '### Italics Text{.subheading}\n' +
    'Similar to bold text, wrapping the text inside single `*` or `_` can make the text italics.{.paragraph}\n' +
    '\n' +
    'For example, the *Text is Italics* and also, _this is italics_.{.paragraph}\n' +
    '\n' +
    '### Lists{.subheading}\n' +
    'Lists are easy to make, just start with any of these symbols `*, +, -`. When new level of nesting is needed give a `tab` infront of the line and start using any of the mentioned symbols again.{.paragraph}\n' +
    '\n' +
    'Lists can have class `.numbers` for showing numbered list and `.disc` for bullet point only list. You can also use class `.inside` for adding extra padding on left hand side of the list and `.outside` for removing extra padding from left side of the list.{.paragraph}\n' +
    '\n' +
    '* Item 1\n' +
    '* Item 2\n' +
    '    + This is sub item 1\n' +
    '    + This is 2\n' +
    '    {.numbers .inside}\n' +
    '\n' +
    '{.disc .inside}\n' +
    '\n' +
    'Important! The **sub list or inner list** must have the classes applied **directly below** the last item while the **outer list** classes must be applied **after an empty line** below the last item of the list. See above example for understanding this carefully.{.warning}\n' +
    '\n' +
    '### Strikethrough{.subheading}\n' +
    'Sometimes we need to show the updated/correct version of the text and the bring attention to details, we need to show what is corrected, in such a case a text can be shown striked out using the `.strike` class.{.paragraph}\n' +
    '\n' +
    'For example, [This sentence is striked out]{.strike} and you can see it.{.paragraph}\n' +
    '\n' +
    '### URLs{.subheading}\n' +
    'To use a link inside the contents, which can bring the user to specific part of the same chapter or to any other content on the internet, use the link format as `[URL Desciption](https://link-to-post)`. Also, to highlight the URL when mouse is hovered over it, use `.url` class.{.paragraph}\n' +
    '\n' +
    'For example click [**here**](https://aryxo.com){.url} to go to our website. You can also use `#id` for linking to the specific part on the same page. For example, click [here](#section-one){.url} to go back to Section One on this page.{.paragraph}\n' +
    '\n' +
    '### Blockquote{.subheading}\n' +
    'To quote somebody, use the `>` (greater than) symbol before line. In case the quote contains multiple lines, use `>` in front of all the lines. At the end use `.quote` class for adding background to the quote.{.paragraph}\n' +
    '\n' +
    '> This is a qoute.\n' +
    '> Wow! what a fantastic quote.\n' +
    '{.quote}\n' +
    '\n' +
    '### Horizontal Rule{.subheading}\n' +
    'To create a horizontal rule below the text, you can use `---` with empty line above and below it.{.paragraph}\n' +
    '\n' +
    '---\n' +
    '\n' +
    'At Aryxo, we do not use horizontal rules inside chapters. So prevent yourself from using this.{.warning}\n' +
    '\n' +
    '### Checklists{.subheading}\n' +
    'Just like the lists shown above, checklists are exactly similar with only difference of adding classes such as `.tick` for Checkmark (YES) and `.cross` for Crossmark (NO) in front of each list item.{.paragraph}\n' +
    '\n' +
    '- this is a complete task{.tick}\n' +
    '- this is an incomplete task{.cross}\n' +
    '- this task does not contain any check or cross marks\n' +
    '\n' +
    '### Tables{.subheading}\n' +
    'Tables are easy to make, just like Github Flavoured Markdown, use the following format for making a table. The headers are separated with pipe `|`. After first row of headers second row contains hyphens separed by pipes again `|` and so on all other rows.{.paragraph}\n' +
    '\n' +
    'First Header | Second Header | Third Header | Fourth Header\n' +
    '------------ | ------------- | ------------ | ------------ \n' +
    'Content 1-1 | Content 1-2 | Content 1-3 | Content 1-4 \n' +
    'Content 2-1 | Content 2-2 | Content 2-3 | Content 2-4\n' +
    '\n' +
    '### Alerts{.subheading}\n' +
    'To bring user\'s attention to certain informational messages, use any of the 4 supported levels of alerts, `.caution` for general issues to bring attention to, `.warning` for any potentially dangerous task or consequences of high degree of alertness, `.success` is used for general results or to show any task finished successfully and `.note` can be used for anything worth notifying. Alerts can only be used with empty line above and below.{.paragraph}\n' +
    '\n' +
    'This is a caution{.caution}\n' +
    '\n' +
    'This is a warning message{.warning}\n' +
    '\n' +
    'This is a success message{.success}\n' +
    '\n' +
    'This is a normal note{.note}\n' +
    '\n' +
    '## Margins{.heading}\n' +
    'As helper classes, margins can be used additionally to provide margins above and below the text. For example the following levels of margins are supported.{.paragraph}\n' +
    '\n' +
    '### Margin Large{.subheading}\n' +
    'Use `.margin-large` class to give large margins on top and bottom both. This paragraph contains equally large margins on top and bottom. Use `.margin-top-large` for large top margin only or `.margin-bottom-large` for large bottom margin only.{.paragraph .margin-large}\n' +
    '\n' +
    '### Margin Medium{.subheading}\n' +
    'Use `.margin-medium` class to give medium margins on top and bottom both. This paragraph contains equally medium margins on top and bottom. Use `.margin-top-medium` for medium top margin only or `.margin-bottom-medium` for medium bottom margin only.{.paragraph .margin-medium}\n' +
    '\n' +
    '### Margin Small{.subheading}\n' +
    'Use `.margin-small` class to give small margins on top and bottom both. This paragraph contains equally small margins on top and bottom. Use `.margin-top-small` for small top margin only or `.margin-bottom-small` for small bottom margin only.{.paragraph .margin-small}\n'

export default sample;