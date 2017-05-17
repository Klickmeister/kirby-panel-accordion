# Kirby Panel Accordion
This Plugin collapses the content below headlines in the kirby cms panel.

## Setup

### Simple way 
Download the repository and extract it to site/plugins/headlineaccordion.

### Via Git
Clone the repository to your plugin directory.<br>
For example if you are in your kirby root directory use:<br>
<br>
`git clone git@github.com:Klickmeister/kirby-panel-accordion.git headlineaccordion`<br>
<br>
Make sure that the folder name of this plugin is called `headlineaccordion`!<br>

## Usage
Add a field named `headlineccordion` to your blueprint and set it's type to headlineccordion as well:

```yml
fields:
 headlineccordion:
  type: headlineaccordion
```  

The content of every headline is collapsed by default.
