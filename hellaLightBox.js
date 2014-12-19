(function ($) {
  'use strict';

  var pluginName = 'hellaLightBox',
    defaults = {
      trigger: 1000,
      triggerEvent: 'click',
      hideOnBgClick: true,
      xOut: 'X'
    },

    Lightbox = function (element, trigger, options) {
      this.$el = $(element);
      this.options = $.extend({}, defaults, {trigger: trigger}, options);
      this.$bg = this.setBg();
      this.init();
    };

  Lightbox.prototype = {
    addLightboxToDom: function () {
      var xOut = '<div class="x-out" style="position:absolute;cursor:pointer;">'+this.options.xOut+'</div>';
      this.$el.css({
        display: 'none',
        position: 'absolute',
        'z-index': 10
      }).append(xOut);
    },

    setBg: function () {
      if ($('.lightbox-transparency').length > 0) return $('.lightbox-transparency');
      else {
        var $bg = $('<div class="lightbox-transparency"></div>');
        $bg.css({
          visibility: 'hidden',
          width: '100%',
          position: 'absolute',
          top: 0, left: 0,
          'z-index': 5,
          'background-color': '#000'
        }).appendTo('body');
        return $bg;
      }
    },

    centerElement: function ($el) {
      $el.css("position","absolute");
      $el.css("top", Math.max(0, (($(window).height() - $($el).outerHeight()) / 2) + $(window).scrollTop()) + "px");
      $el.css("left", Math.max(0, (($(window).width() - $($el).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
      return $el;
    },

    show: function () {
      if (this.$el.is(':visible')) return false;
      this.$bg.css({
        visibility: 'visible',
        display: 'block',
        opacity: 0.9,
        height: $(document).height() + 'px'
      });
      this.centerElement(this.$el).fadeIn();
    },

    hide: function () {
      this.$el.fadeOut('fast');
      this.$bg.fadeOut('fast');
    },

    bindHideEvents: function (hide) {
      $('.x-out').click(hide);
      if (this.options.hideOnBgClick) this.$bg.css('cursor', 'pointer').click(hide);
    },

    bindShowEvent: function (show) {
      var opts = this.options,
        triggerType = typeof opts.trigger;

      if (triggerType === 'number') {
        setTimeout(show, opts.trigger);
      } else if (triggerType === 'string') {
        $(opts.trigger).on(opts.triggerEvent, show);
      } else return false;
    },

    init: function () {
      this.addLightboxToDom();
      this.bindShowEvent($.proxy(this.show, this));
      this.bindHideEvents($.proxy(this.hide, this));
    }
  };

  $.fn[pluginName] = function (trigger, hideOnBgClick) {
    return this.each(function () {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Lightbox(this, trigger, hideOnBgClick));
      }
    });
  };

}(jQuery));