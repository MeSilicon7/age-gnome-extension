const St = imports.gi.St;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const settings = ExtensionUtils.getSettings('org.gnome.shell.extensions.age');

let ageIndicator, ageLabel;

function init() {
  ageIndicator = new PanelMenu.Button(0.0, 'Age Indicator');
  ageLabel = new St.Label({ text: '' });
  ageIndicator.add_child(ageLabel);
  ageIndicator.actor.style_class = 'age-indicator'; // Add a custom style class
  Main.panel.addToStatusArea('age-indicator', ageIndicator, 0, 'right');
}

function updateAge() {
  const showAge = settings.get_boolean('show-age');
  const dateOfBirth = new Date(0, 0, 0); // Replace with your actual date of birth Y , M , D
  const now = new Date();
  const ageYears = now.getFullYear() - dateOfBirth.getFullYear();
  const ageMonths = now.getMonth() - dateOfBirth.getMonth();
  const ageText = showAge ? `Age: ${ageYears} years ${ageMonths} months` : '';
  ageLabel.set_text(ageText);
}

function enable() {
  updateAge();
  ageLabel.show();
  settings.connect('changed::show-age', updateAge);
}

function disable() {
  ageLabel.hide();
  settings.disconnect('changed::show-age', updateAge);
}
