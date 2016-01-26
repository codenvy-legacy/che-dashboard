/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';


import {CodenvyBoxCtrl} from './box/cdvy-box.controller';
import {CodenvyBox} from './box/cdvy-box.directive';
import {CodenvyButtonPrimary} from './button/cdvy-button-primary.directive';
import {CodenvyButtonDanger} from './button/cdvy-button-danger.directive';
import {CodenvyButtonDefault} from './button/cdvy-button-default.directive';
import {CodenvyButtonNotice} from './button/cdvy-button-notice.directive';
import {CodenvyButtonWarning} from './button/cdvy-button-warning.directive';
import {CodenvyButtonDropdownCtrl} from './button-dropdown/cdvy-button-dropdown.controller';
import {CodenvyButtonDropdown} from './button-dropdown/cdvy-button-dropdown.directive';
import {CodenvyClipboard} from './copy-clipboard/cdvy-clipboard.directive';
import {CodenvyDropZoneCtrl} from './dropzone/cdvy-dropzone.controller';
import {CodenvyDropZone} from './dropzone/cdvy-dropzone.directive';
import {CodenvyEmptyState} from './empty-state/cdvy-empty-state.directive';
import {CodenvyEventLogger} from './event-logger/cdvy-event-logger.directive';
import {CodenvyFrame} from './frame/cdvy-frame.directive';
import {CodenvyHtmlSource} from './html-source/cdvy-html-source.directive';
import {CodenvyInput} from './input/cdvy-input.directive';
import {CodenvyLabel} from './label/cdvy-label.directive';
import {CodenvyLabelContainer} from './label-container/cdvy-label-container.directive';
import {CodenvyLearnMoreCtrl} from './learn-more/cdvy-learn-more.controller';
import {CodenvyLearnMore} from './learn-more/cdvy-learn-more.directive';
import {CodenvyLearnMoreItem} from './learn-more/cdvy-learn-more-item.directive';
import {CodenvyLearnMoreTemplate} from './learn-more/cdvy-learn-more-template.directive';
import {CodenvyLink} from './link/cdvy-link.directive';
import {CodenvyList} from './list/cdvy-list.directive';
import {CodenvyListItem} from './list/cdvy-list-item.directive';
import {CodenvyListTitle} from './list/cdvy-list-title.directive';
import {CodenvyListItemChecked} from './list/cdvy-list-item-checked.directive';
import {CodenvyPanelCtrl} from './panel/cdvy-panel.controller';
import {CodenvyPanel} from './panel/cdvy-panel.directive';
import {CodenvySearch} from './search/cdvy-search.directive';
import {CodenvySelect} from './select/cdvy-select.directive';
import {CodenvySelecterCtrl} from './selecter/cdvy-selecter.controller';
import {CodenvySelecter} from './selecter/cdvy-selecter.directive';
import {CodenvySimpleSelecterCtrl} from './simple-selecter/cdvy-simple-selecter.controller';
import {CodenvySimpleSelecter} from './simple-selecter/cdvy-simple-selecter.directive';
import {CodenvySlider} from './slider/cdvy-slider.directive';
import {CodenvyTextInfo} from './text-info/cdvy-text-info.directive';
import {CodenvyToggleCtrl} from './toggle-button/cdvy-toggle.controller';
import {CodenvyToggleButton} from './toggle-button/cdvy-toggle-button.directive';
import {CodenvyToggle} from './toggle-button/cdvy-toggle.directive';
import {CodenvyToolbar} from './toolbar/toolbar.directive';


export class WidgetConfig {

  constructor(register) {

    //box
    register.controller('CodenvyBoxCtrl', CodenvyBoxCtrl)
      .directive('cdvyBox', CodenvyBox)

      // button
      .directive('cdvyButtonPrimary', CodenvyButtonPrimary)
      .directive('cdvyButtonDanger', CodenvyButtonDanger)
      .directive('cdvyButtonDefault', CodenvyButtonDefault)
      .directive('cdvyButtonNotice', CodenvyButtonNotice)
      .directive('cdvyButtonWarning', CodenvyButtonWarning)
      // dropdown
      .controller('CodenvyButtonDropdownCtrl', CodenvyButtonDropdownCtrl)
      .directive('cdvyButtonDropdown', CodenvyButtonDropdown)
      //clipboard
      .directive('cdvyClipboard', CodenvyClipboard)
      //dropzone
      .controller('CodenvyDropZoneCtrl', CodenvyDropZoneCtrl)
      .directive('cdvyDropzone', CodenvyDropZone)
      .directive('cdvyEmptyState', CodenvyEmptyState)
      .directive('cdvyEventLogger', CodenvyEventLogger)
      .directive('cdvyFrame', CodenvyFrame)
      .directive('cdvyHtmlSource', CodenvyHtmlSource)
      .directive('cdvyInput', CodenvyInput)
      .directive('cdvyLabel', CodenvyLabel)
      .directive('cdvyLabelContainer', CodenvyLabelContainer)

      .controller('CodenvyLearnMoreCtrl', CodenvyLearnMoreCtrl)
      .directive('cdvyLearnMore', CodenvyLearnMore)
      .directive('cdvyLearnMoreItem', CodenvyLearnMoreItem)
      .directive('cdvyLearnMoreTemplate', CodenvyLearnMoreTemplate)

      .directive('cdvyLink', CodenvyLink)

      .directive('cdvyListItemChecked', CodenvyListItemChecked)
      .directive('cdvyListTitle', CodenvyListTitle)
      .directive('cdvyList', CodenvyList)
      .directive('cdvyListItem', CodenvyListItem)

      .controller('CodenvyPanelCtrl', CodenvyPanelCtrl)
      .directive('cdvyPanel', CodenvyPanel)

      .directive('cdvySearch', CodenvySearch)

      .directive('cdvySelect', CodenvySelect)

      .controller('CodenvySelecterCtrl', CodenvySelecterCtrl)
      .directive('cdvySelecter', CodenvySelecter)

      .controller('CodenvySimpleSelecterCtrl', CodenvySimpleSelecterCtrl)
      .directive('cdvySimpleSelecter', CodenvySimpleSelecter)

      .directive('cdvySlider', CodenvySlider)
      .directive('cdvyTextInfo', CodenvyTextInfo)

      .controller('CodenvyToggleCtrl', CodenvyToggleCtrl)
      .directive('cdvyToggleButton', CodenvyToggleButton)
      .directive('cdvyToggle', CodenvyToggle)

      .directive('cdvyToolbar', CodenvyToolbar);

  }
}
