///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/fx',
  'dojo/on',
  'dojo/keys',
  'dijit/Tooltip',
  'jimu/utils',
  'dojo/Evented',
  'dojo/dom-style',
  'dojo/dom-class',
  'dojo/dom-geometry',
  'dojo/dnd/move',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./GroupItems.html',
  './BaseIconItem'
  ], function(declare, array, lang, html, coreFx, on, keys, Tooltip, utils, Evented, domStyle, domClass,
  domGeometry, Move, _WidgetBase, _TemplatedMixin, template, BaseIconItem){
  /* global jimuConfig */
  /**
   * @exports themes/LaunchpadTheme/widgets/AnchorBarController/GroupItems
   */
  var clazz = declare([_WidgetBase, _TemplatedMixin, Evented], {
    baseClass: 'jimu-anchorbar-controller-group',
    templateString: template,
    /**
     * Widget info.
     * @type {object} - Include label and uri.
     */
    config: null,
    dockableItem: null,
    backgroundColor: null,
    itemList: [],
    box: null,

    postMixInProperties:function(){
      this.headerNls = window.jimuNls.panelHeader;
    },

    postCreate: function() {
      this.inherited(arguments);

      //create widget group
      array.forEach(this.config.widgets, function(widgetConfig, subIndex){
        var groupItem = new BaseIconItem({
          config: widgetConfig,
          backgroundIndex: subIndex,
          itemTabIndex: 0
        });
        groupItem.placeAt(this.containerNode);

        this.own(on(groupItem, 'nodeClick', lang.hitch(this, this._onIconClick)));
        this.itemList.push(groupItem);

        //add tooltips
        utils.addTooltipByDomNode(Tooltip, groupItem.iconItemNode, widgetConfig.label);
      }, this);

      domClass.add(this.colorfulHeader, 'icon-item-background' +
          this.dockableItem.getBackgroundColorIndex());

      this.own(on(this.domNode, 'keydown', lang.hitch(this, function(evt){
        if(!html.hasClass(evt.target, 'close-icon') && evt.keyCode === keys.ESCAPE){
          this.closeNode.focus();
        }else if(evt.keyCode === keys.TAB && html.hasClass(evt.target, 'icon-item')){
          var nextItem;
          if(!evt.shiftKey && !evt.target.parentNode.nextElementSibling){
            nextItem = this.itemList[0];
          }else if(evt.shiftKey && !evt.target.parentNode.previousElementSibling){
            nextItem = this.itemList[this.itemList.length - 1];
          }
          if(nextItem){
            evt.preventDefault();
            nextItem.iconItemNode.focus();
          }
        }
      })));
    },

    startup: function(){
      this.inherited(arguments);

      this.box = domGeometry.getMarginBox(this.domNode);
      this.makeMoveable(this.titleNode, this.box);
    },

    getItemList: function(){
      return this.itemList;
    },

    makeMoveable: function(handleNode, box) {
      var containerBox;
      this.disableMoveable();

      containerBox = domGeometry.getMarginBox(jimuConfig.layoutId);
      containerBox.l = containerBox.l - box.w * 0.5;
      containerBox.w = containerBox.w + box.w;

      this.moveable = new Move.boxConstrainedMoveable(this.domNode, {
        box: containerBox,
        handle: handleNode || this.titleNode,
        within: true
      });
      this.own(on(this.moveable, 'Moving', lang.hitch(this, this.onMoving)));
      this.own(on(this.moveable, 'MoveStop', lang.hitch(this, this.onMoveStop)));
    },

    getItemNum: function(){
      return this.config.widgets.length;
    },

    disableMoveable: function() {
      if (this.moveable) {
        this.moveable.destroy();
        this.moveable = null;
      }
    },

    onMoving: function(mover) {
      domStyle.set(mover.node, 'opacity', 0.9);
    },

    onMoveStop: function(mover) {
      domStyle.set(mover.node, 'opacity', 1);
    },

    open: function(){
      coreFx.wipeIn({
        node: this.domNode,
        duration: 400
      }).play();
      //focus on first widget icon.
      setTimeout(lang.hitch(this, function(){
        this.itemList[0].iconItemNode.focus();
      }), 405);
    },

    close: function(){
      coreFx.wipeOut({
        node: this.domNode,
        duration: 400
      }).play();
      this.dockableItem.setOpened(false);
    },

    closeImmedaite: function(){
      domStyle.set(this.domNode, 'display', 'none');
      this.dockableItem.setOpened(false);
    },

    _onCloseBtnClicked: function(){
      this.close();
      this.emit('groupCloseBtnClicked');
    },

    _onCloseBtnKeydown: function(evt){
      if(evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE){
        this._onCloseBtnClicked();
      }else if(evt.keyCode === keys.TAB && evt.shiftKey){
        evt.preventDefault();
      }
    },

    _onIconClick: function(data) {
      this.emit('groupItemClicked', lang.mixin({
        group: this
      }, data));
    },

    setPosition: function(pos){
      var style = {
        top: typeof pos.top === 'number' ? pos.top + 'px' : 'auto',
        left: typeof pos.left === 'number' ? pos.left + 'px' : 'auto',
        right: typeof pos.right === 'number' ? pos.right + 'px' : 'auto'
      };
      domStyle.set(this.domNode, style);
    }
  });
  return clazz;
});
