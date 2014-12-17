(function ($) {
  'use strict';

  var pluginName = 'hellaLightbox',
    defaults = {
      trigger: 1000,
      triggerEvent: 'click',
      hideOnBgClick: true,
      xOut: 'X'
    },

    Lightbox = function (element, trigger, options) {
      this.$el = $(element);
      this.options = $.extend({}, defaults, {trigger: trigger}, options);
      this.$bg = $('<div class="lightbox-transparency"></div>');
      this.init();
    };

  Lightbox.prototype = {
    addElements: function () {
      var xOut = '<div class="x-out" style="position:absolute;cursor:pointer;">'+this.options.xOut+'</div>';
      this.$el.append(xOut);
      this.$bg.appendTo('body');
    },

    centerElement: function ($el) {
      $el.css("position","absolute");
      $el.css("top", Math.max(0, (($(window).height() - $($el).outerHeight()) / 2) + $(window).scrollTop()) + "px");
      $el.css("left", Math.max(0, (($(window).width() - $($el).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
      return $el;
    },

    show: function () {
      this.$bg.css({
        visibility: 'visible',
        opacity: 0.9,
        height: $(document).height() + 'px'
      });
      this.centerElement(this.$el).fadeIn();
    },

    hide: function () {
      this.$el.fadeOut('fast');
      this.$bg.unbind().fadeOut('fast');
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
      this.$el.hide();
      this.addElements();
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