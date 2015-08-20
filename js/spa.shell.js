/*
 * spa.shell.js
 * Shell module for SPA
 */

spa.shell = (function() {
  var configMap = {
    main_html: String() +
      '<div class="spa-shell-head">' +
        '<div class="spa-shell-head-logo"></div>' +
        '<div class="spa-shell-head-acct"></div>' +
        '<div class="spa-shell-head-search"></div>' +
      '</div>' +
      '<div class="spa-shell-main">' +
        '<div class="spa-shell-main-nav"></div>' +
        '<div class="spa-shell-main-content"></div>' +
      '</div>' +
      '<div class="spa-shell-foot"></div>' +
      '<div class="spa-shell-chat"></div>' +
      '<div class="spa-shell-modal"></div>',

    chatExtendTime: 1000,
    chatRetractTime: 300,
    chatExtendHeight: 450,
    chatRetractHeight: 15
  };
  var stateMap = { $container: null };
  var jqueryMap = {};
  var setJqueryMap, toggleChat, initModule;

  setJqueryMap = function() {
    var $container = stateMap.$container;
    jqueryMap = {
      $container: $container,
      $chat: $container.find('.spa-shell-chat')
    };
  };

  /** DOM method /toggleChat
   * Purpose: Extends or retracts chat slider
   * Arguments:
   *  doExtend - if true, extends slider, if false retracts
   *  callback - optional function to execute at end of animation
   * Settings:
   *  chatExtendTime, chatRetractTime
   *  chatExtendHeight, chatRetractHeight
   * Returns: boolean
   *  true - slider animation activated
   *  false - slider animation not activated
   */
  toggleChat = function(doExtend, callback) {
    var pxChatHt = jqueryMap.$chat.height();
    var isOpen = pxChatHt === configMap.chatExtendHeight;
    var isClosed = pxChatHt === configMap.chatRetractHeight;
    var isSliding = !isOpen && !isClosed;

    // avoid race condition
    if (isSliding) {
      return false;
    }

    // Begin extend chat slider
    if (doExtend) {
      jqueryMap.$chat.animate(
        {height: configMap.chatExtendHeight},
        configMap.chatExtendTime,
        function() {
          if (callback) {
            callback(jqueryMap.$chat);
          }
        }
      );
      return true;
    }

    // Retract chat slider
    jqueryMap.$chat.animate(
      {height: configMap.chatRetractHeight},
      configMap.chatRetractTime,
      function() {
        if (callback) {
          callback(jqueryMap.$chat);
        }
      }
    );

    return true;
  };


  initModule = function($container) {
    stateMap.$container = $container;
    $container.html(configMap.main_html);
    setJqueryMap();

    // test toggle
    setTimeout(function() {
      toggleChat(true);
    }, 3000);
    setTimeout(function() {
      toggleChat(false);
    }, 8000);
  };

  return { initModule: initModule };
}());

