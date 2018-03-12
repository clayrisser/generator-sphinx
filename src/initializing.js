import _ from 'lodash';
import yeomanOptionOrPrompt from 'yeoman-option-or-prompt';

export default async function initialize(yo) {
  yo.context = { _ };
  yo.optionOrPrompt = yeomanOptionOrPrompt;
}
