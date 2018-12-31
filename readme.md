# config-dye

A CLI tool for processing templates using nunjucks, focused on theming.

For example, if we had an i3 configuration file

```
client.focused          #FF0000 #FF0000 #333333 #FFFFFF #FF0000
client.unfocused        #333333 #333333 #FF0000 #FF0000
```

We could extract the colors there to a data.json file:

```json
{
    "accent": "#FF0000",
    "background": "#333333",
    "light" "#FFFFFF"
}
```

And have our config file as

```nunjucks
client.focused          {{accent}} {{accent}} {{background}} {{light}} {{accent}}
client.unfocused        {{background}} {{background}} {{accent}} {{accent}}
```

Which will result into the first block. This allows to process many config files with the same variables under a single process pass.

### Usage

```bash
npx config-templates --path=./templates --data=data.json --dest=./.config
```

This will recursively process all the `.njk` files within ./templates, and output them, applying data.json, with the same structure to ./config.

### Filters

Additionally the templating process has filters to process colors using [color](https://www.npmjs.com/package/color).

For example , for the following

```nunjucks
{{accent | lighten(0.5) | hex}}
```

Results in `#FF8080`.
You can also chain more commands as necessary:

```nunjucks
{{accent | lighten(0.5) | rotate(50) | hex}}
```

Will result in `#FFEA80`

When processing colors, remember to finish off with the proper output format (e.g.: `hex`, `rgb`, `hsl`)

The following methods are supported

- lighten
- darken
- hsl
- rgb
- saturate
- desaturate
- rotate
- hex
- isDark
- isLight
- contrast

### Templating

All [nunjucks](https://mozilla.github.io/nunjucks/templating.html) features are available.

`include` is possible, and allows for further config file organization. Keep in mind all files are relative to the one being rendered.

You can also have partials within your template files, which means they will not output directly to a file, and just exist to be included within other files. These files are prepended with an underscore `_`, e.g.: \_header.njk.
