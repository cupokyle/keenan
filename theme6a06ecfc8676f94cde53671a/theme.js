!(function () {

  /**
   * Loading spinner override
   */
  NB.loadingIndicator = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 0a2.521 2.521 0 00-2.527 2.527v4.21A2.52 2.52 0 0016 9.262a2.52 2.52 0 002.527-2.525v-4.21C18.527 1.127 17.4 0 16 0zM6.473 3.944a2.52 2.52 0 00-1.787.742c-.99.99-.99 2.584 0 3.573l2.978 2.977c.99.99 2.582.99 3.572 0a2.52 2.52 0 000-3.572L8.259 4.686a2.517 2.517 0 00-1.786-.742zm19.054 0c-.646 0-1.292.247-1.786.742l-2.977 2.978a2.52 2.52 0 000 3.572c.99.99 2.582.99 3.572 0l2.978-2.977c.99-.99.99-2.583 0-3.573a2.521 2.521 0 00-1.787-.742zm-23 9.53A2.521 2.521 0 000 16c0 1.4 1.127 2.527 2.527 2.527h4.21A2.52 2.52 0 009.262 16a2.52 2.52 0 00-2.525-2.527h-4.21zm22.735 0A2.52 2.52 0 0022.738 16a2.52 2.52 0 002.524 2.527h4.211C30.873 18.527 32 17.4 32 16c0-1.4-1.127-2.527-2.527-2.527h-4.21zM9.45 20.021c-.646 0-1.291.247-1.786.742l-2.978 2.977c-.99.99-.99 2.583 0 3.573.99.99 2.584.99 3.573 0l2.977-2.978a2.52 2.52 0 000-3.572 2.517 2.517 0 00-1.786-.742zm13.1 0c-.646 0-1.291.247-1.786.742a2.52 2.52 0 000 3.572l2.977 2.978c.99.99 2.583.99 3.573 0 .99-.99.99-2.584 0-3.573l-2.978-2.977a2.517 2.517 0 00-1.786-.742zM16 22.738a2.52 2.52 0 00-2.527 2.524v4.211C13.473 30.873 14.6 32 16 32c1.4 0 2.527-1.127 2.527-2.527v-4.21A2.52 2.52 0 0016 22.736z" fill="#fff" fill-opacity=".8"/></svg>'


  /**
   * Custom brand cascade guard
   * @description NationBuilder preview can append or mutate stock theme styles
   * after clicks in the preview frame. Keep theme.scss and a tiny runtime brand
   * lock as the last styles for the full page lifetime so our brand variables
   * and overrides remain authoritative across every desktop and mobile page.
   */
  var keepThemeStylesheetLast = function () {
    var root = document.documentElement;
    if (!root || root.dataset.themeStylesheetGuard === 'active') return;

    root.dataset.themeStylesheetGuard = 'active';
    var queued = false;
    var brandGuardCss = [
      ':root,html,body,body.momentum-theme{',
      '--theme-color-cream:#f9f3e7;',
      '--theme-color-primary:#ed2b08;',
      '--theme-color-primary-dark:#c52407;',
      '--theme-color-secondary:#006793;',
      '--theme-color-accent:#ffb700;',
      '--theme-color-black:#000000;',
      '--theme-text-base:#c52407;',
      '--theme-text-heading:#ed2b08;',
      '--theme-text-link:#006793;',
      '--theme-text-link-hover:#004b6c;',
      '--theme-text-muted:#e1735e;',
      '--theme-text-on-primary:#f9f3e7;',
      '--theme-font-sans:"Hanken Grotesk","Source Sans Pro",Helvetica,Arial,sans-serif;',
      '--theme-font-serif:"Hanken Grotesk","Source Sans Pro",Helvetica,Arial,sans-serif;',
      '--theme-font-mono:"Source Code Pro",monospace;',
      '}',
      'html body{background-color:var(--theme-color-cream)!important;color:var(--theme-text-base)!important;font-family:var(--theme-font-sans)!important;}',
      'body,body *:not(svg):not(path):not(use){font-family:var(--theme-font-sans)!important;}',
      'body h1,body h2,body h3,body h4,body h5,body h6,body .h1,body .h2,body .h3,body .h4,body .h5,body .h6,body .page-headline{color:var(--theme-text-heading)!important;font-family:var(--theme-font-sans)!important;}',
      'body a,body .text-primary{color:var(--theme-text-link)!important;}',
      'body a:hover,body a:focus{color:var(--theme-text-link-hover)!important;}',
      'body .text-muted,body small,body .small,body .byline{color:var(--theme-text-muted)!important;}',
      'body .text-serif{font-family:var(--theme-font-serif)!important;}body .text-monospace,body code,body kbd,body pre,body samp{font-family:var(--theme-font-mono)!important;}',
      'body .page,body .page-inner,body .card,body .modal-body,body .dropdown-menu,body .navbar-more-inner,body #header,body #mobileNav{background-color:var(--theme-color-cream)!important;}',
      'body .btn-primary,body .submit-button,body .bg-primary,body #cc-request-button button{background-color:var(--theme-color-primary)!important;border-color:var(--theme-color-primary)!important;color:var(--theme-text-on-primary)!important;}',
      'body .btn-secondary,body .bg-secondary{background-color:var(--theme-color-secondary)!important;border-color:var(--theme-color-secondary)!important;color:var(--theme-text-on-primary)!important;}',
      'body .btn-outline-primary{border-color:var(--theme-color-primary)!important;color:var(--theme-color-primary)!important;}',
      'body .btn-outline-primary:hover,body .btn-outline-primary:focus{background-color:var(--theme-color-primary)!important;color:var(--theme-text-on-primary)!important;}',
      'body .navbar-light .navbar-nav .nav-link,body #mobileNav .nav-link,body .navbar-more-item{color:var(--theme-color-secondary)!important;font-family:var(--theme-font-sans)!important;}',
      'body .navbar-light .navbar-nav .nav-link:hover,body .navbar-light .navbar-nav .nav-link:focus,body #mobileNav .nav-link:hover,body #mobileNav .nav-link:focus,body .navbar-more-item:hover,body .navbar-more-item:focus{color:var(--theme-color-primary)!important;}',
      'body .form-control,body .custom-select,body .custom-file-label{background-color:var(--theme-color-cream)!important;color:var(--theme-text-base)!important;font-family:var(--theme-font-sans)!important;}',
      'body .bg-light,body .bg-white{background-color:var(--theme-color-cream)!important;}body .bg-dark{background-color:var(--theme-color-primary-dark)!important;color:var(--theme-text-on-primary)!important;}',
      'body section#actionbutton-basic-template{background-color:var(--theme-color-primary-dark)!important;}body section#actionbutton-basic-template .page-content{color:var(--theme-text-on-primary)!important;}',
      '@media(max-width:991.98px){body #mobileNav,body .navbar-collapse,body .navbar-more-inner{background-color:var(--theme-color-cream)!important;color:var(--theme-text-base)!important;}}'
    ].join('');

    function getThemeStylesheet() {
      var scope = document;
      return scope.querySelector('link[data-theme-stylesheet="custom"]') ||
        scope.querySelector('link[rel~="stylesheet"][href*="theme.scss"]') ||
        scope.querySelector('link[rel~="stylesheet"][href*="theme.css"]');
    }

    function getBrandGuardStyle() {
      var guard = document.querySelector('style[data-theme-brand-guard="runtime"]');
      if (!guard) {
        guard = document.createElement('style');
        guard.setAttribute('data-theme-brand-guard', 'runtime');
        guard.appendChild(document.createTextNode(brandGuardCss));
      } else if (guard.textContent !== brandGuardCss) {
        guard.textContent = brandGuardCss;
      }
      return guard;
    }

    function lastStyleContainer() {
      return document.body || document.head || root;
    }

    function moveThemeStylesLast() {
      queued = false;
      var themeStylesheet = getThemeStylesheet();
      var guard = getBrandGuardStyle();
      var container = lastStyleContainer();
      var orderedStyles = Array.prototype.slice.call(document.querySelectorAll('link[rel~="stylesheet"], style'));
      var lastStyle = orderedStyles[orderedStyles.length - 1];
      var nextToLastStyle = orderedStyles[orderedStyles.length - 2];

      if (lastStyle === guard && (!themeStylesheet || nextToLastStyle === themeStylesheet)) return;

      if (themeStylesheet) {
        container.appendChild(themeStylesheet);
      }
      container.appendChild(guard);
    }

    function queueMoveThemeStylesLast() {
      if (queued) return;
      queued = true;
      (window.requestAnimationFrame || window.setTimeout)(moveThemeStylesLast);
    }

    function queueMoveAfterPreviewUpdate() {
      queueMoveThemeStylesLast();
      window.setTimeout(queueMoveThemeStylesLast, 50);
      window.setTimeout(queueMoveThemeStylesLast, 250);
      window.setTimeout(queueMoveThemeStylesLast, 1000);
      window.setTimeout(queueMoveThemeStylesLast, 2500);
      window.setTimeout(queueMoveThemeStylesLast, 5000);
    }

    moveThemeStylesLast();

    if (window.MutationObserver) {
      var observer = new MutationObserver(queueMoveThemeStylesLast);
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['href', 'rel', 'media', 'disabled', 'style', 'class'],
        childList: true,
        subtree: true
      });
    }

    ['click', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'keyup', 'scroll', 'resize', 'orientationchange', 'pageshow', 'popstate', 'hashchange', 'load'].forEach(function (eventName) {
      window.addEventListener(eventName, queueMoveAfterPreviewUpdate, true);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Bootstrap breakpoints
   */
  var bsMediaQuerySM = window.matchMedia('(min-width: 576px)');
  var bsMediaQueryMD = window.matchMedia('(min-width: 768px)');
  var bsMediaQueryLG = window.matchMedia('(min-width: 992px)');
  var bsMediaQueryXL = window.matchMedia('(min-width: 1200px)');

  function isOutOfViewport(element) {
    var bounding = element.getBoundingClientRect();
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left + 30 < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.right = bounding.right + 30 > (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
    return out;
  };

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Address inputs
   * @description Render localized inputs based on country selection.
   */
  var addressInputs = function () {
    var containers = Array.prototype.slice.call(document.querySelectorAll('[data-address-inputs]'));
    if (!containers) {
      return;
    }
    var northernEuropeanGroups = ['BE', 'NE', 'CH', 'PT', 'SP', 'FI', 'SE', 'LI', 'AT', 'DK', 'DE', 'IS', 'NO'];
    var supportedGroups = ['US', 'CA', 'AU', 'NZ', 'GB', 'FR', 'IT'];

    containers.forEach(function (container) {
      var toggle = container.querySelector('.address-inputs-toggle');
      var slot = container.querySelector('[data-address-inputs-slot]');
      var groups = Array.prototype.slice.call(container.querySelectorAll('[data-address-inputs-group]'));
      var groupClones = [];

      groups.forEach(function (group) {
        var clone = group.cloneNode(true);
        var groupObj = Object.assign({
          id: clone.dataset.addressInputsGroup,
          element: clone,
        });
        groupClones.push(groupObj);
        container.removeChild(group);
      });

      renderSelectedGroup(toggle.value);

      toggle.addEventListener('change', function (e) {
        var val = e.target.value;
        renderSelectedGroup(val);
      });

      function renderSelectedGroup(val) {
        var id;
        if (northernEuropeanGroups.includes(val)) {
          id = 'NEC';
        } else if (supportedGroups.includes(val)) {
          id = val;
        } else {
          id = 'FALLBACK';
        }
        var selectedGroup = groupClones.filter(function (group) {
          return group.id === id;
        })[0];
        if (selectedGroup && selectedGroup.element) {
          slot.innerHTML = selectedGroup.element.innerHTML;
          floatLabels();
        }
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Autogrow text areas
   * @description Autogrow textareas in a clean and efficient method.
   * @see {@link https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/}
   */
  var autoGrow = function () {
    const elms = Array.prototype.slice.call(document.querySelectorAll(".auto-grow"));
    if (!elms) {
      return;
    }
    elms.forEach(function (el) {
      var textarea = el.querySelector("textarea");
      el.dataset.replicatedValue = textarea.value;
      textarea.addEventListener("input", function () {
        el.dataset.replicatedValue = textarea.value;
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Comment form
   * @description Functionality for the comment form within the page stream.
   */
  var commentForm = function () {
    var $textArea = $('#commentForm textarea');

    if (!$textArea.length) {
      return;
    }

    $textArea
      .on('focus click', function () {
        $(this).closest('.comment').addClass('is-focused');
      })
      .on('blur', function () {
        $(this).closest('.comment').removeClass('is-focused');
      });

    $('#commentForm')
      .on('show.bs.collapse', function () {
        $('[data-target="#commentForm"]').hide();
      })
      .on('shown.bs.collapse', function () {
        $textArea.focus();
      });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Copy to clipboard
   * @description Copy to clipboard functionality.
   * @see {@link https://github.com/zenorocha/clipboard.js}
   * @example <div class="input-group" data-focus-target="tracking_link">
   *            <input type="text" id="tracking_link" class="form-control" value="{{ page.recruiting.featured_page.full_url_with_recruiter }}" aria-describedby="button-addon4" readonly="readonly">
   *            <div class="input-group-append" id="button-addon4">
   *              <button class="btn btn-secondary" type="button" data-clipboard-target="#tracking_link" data-toggle="tooltip" data-trigger="manual" data-placement="top" title="{{ t_copied }}">{{ t_copy_link }}</button>
   *            </div>
   *          </div>
   */
  var copyToClipboard = function () {
    $('[data-clipboard-target]').each(function () {
      var el = $(this)[0];
      var _this = $(this);
      var clipboard = new ClipboardJS(el);
      clipboard.on('success', function (e) {
        _this.tooltip('show');
        setTimeout(function () {
          _this.tooltip('hide');
        }, 2000);
        e.clearSelection();
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Fixed header
   * @description Fix the header to top of viewpoint on scroll when page tag contains .fixed-header.
   */
  var fixedHeader = function () {
    if (!document.body.classList.contains('fixed-header')) return;
    var header = document.getElementById('header');
    var headerSpacer = document.createElement('div');
    headerSpacer.style.height = header.clientHeight + 'px';
    headerSpacer.style.width = '100%';
    var headerOffsetTop = header.offsetTop;
    var windowScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setHeaderPosition);
    window.requestAnimationFrame(setHeaderPosition);

    function handleScroll() {
      requestAnimationFrame(function () {
        windowScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        setHeaderPosition();
      });
    }

    function setHeaderPosition() {
      if (windowScrollPosition >= headerOffsetTop && bsMediaQueryLG.matches) {
        header.classList.add('is-fixed');
        document.body.prepend(headerSpacer);
      } else {
        header.classList.remove('is-fixed');
        if (document.body.contains(headerSpacer)) {
          document.body.removeChild(headerSpacer);
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Float labels
   * @description Labels are used as placeholders then floated when input not empty.
   * @example <div class="float-label">
   *            <label for="signup_first_name">First name</label>
   *            {% text_field "first_name", class:"form-control text" %}
   *          </div>
   */
  var floatLabels = function () {
    Array.prototype.slice.call(document.querySelectorAll(".float-label")).forEach(function (el) {
      if (!el) return;
      var label = el.querySelector("label");
      var input = el.querySelector('.form-control') || el.querySelector('.custom-select');
      var activeClass = "float-label-active";

      if (!label || !input) {
        return;
      }

      if (input.disabled) {
        el.classList.add('disabled');
      }

      if (input.classList.contains("form-control-sm") || input.classList.contains("custom-select-sm")) {
        el.classList.add("float-label-sm");
      }

      if (input.classList.contains("form-control-lg") || input.classList.contains("custom-select-lg")) {
        el.classList.add("float-label-lg");
      }

      var handleChange = function () {
        if (input.value === "") {
          el.classList.remove(activeClass);
        } else {
          el.classList.add(activeClass);
        }
      };

      var init = function () {
        handleChange();

        el.addEventListener("focus", function () {
          el.classList.add(activeClass);
        });

        el.addEventListener("blur", function () {
          el.classList.remove(activeClass);
        });

        ["keyup", "blur", "change", "input"].forEach(function (event) {
          el.addEventListener(event, handleChange);
        });
      };

      init();
    });

    // Custom file inputs
    Array.prototype.slice.call(document.querySelectorAll(".custom-file")).forEach(function (el) {
      var input = el.querySelector('input');
      var label = el.querySelector('label');
      if (!label || !input) {
        return;
      }
      if (input.disabled) {
        el.classList.add('disabled');
      }
      el.setAttribute('data-label', label.textContent);
      input.addEventListener('change', function () {
        el.classList.add('custom-file-active');
      });
    });
  };

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Focus target
   * @description Detect when an input is focused within an input group.
   */
  var focusTarget = function () {
    var elms = Array.prototype.slice.call(document.querySelectorAll("[data-focus-target]"));
    if (!elms) {
      return;
    }
    elms.forEach(function (el) {
      var target = document.getElementById(el.dataset.focusTarget);
      if (!target) return;
      target.addEventListener('focus', function () {
        el.classList.add('focused');
      });
      target.addEventListener('blur', function () {
        el.classList.remove('focused');
      });
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Form listeners
   * @description Highlight inputs with form errors returned via JSON. Initalize address inputs
   *              and float labels when elements are ajax'd onto the page.
   */
  var formListeners = function () {
    NB.EventHub.subscribe('ajaxUpdate', function () {
      floatLabels();
      addressInputs();
    });
    NB.EventHub.subscribe('ajaxContentLoaded', masonry);

    NB.EventHub.subscribe("form.failure", function (args) {
      toClear();
      var form = document.querySelector(args.form);
      var errors = args.errors_hash;
      if (!errors) {
        return;
      }
      Object.keys(errors).forEach(function (key) {
        var objClass = args.object_class;
        if (key === 'email1') {
          key = 'email';
        } else if (objClass === 'event_page' && key === 'page.name') {
          key = "page_headline";
        }
        var id = "#" + objClass + "_" + key.replace(".", "_").replace(/ /g, "_");
        var input = form.querySelector(id);
        if (input) {
          var group = input.closest('.form-group');
          group.classList.add("is-invalid");
          input.classList.add("is-invalid");
        }
      });
    });

    function toClear() {
      Array.prototype.slice
        .call(document.querySelectorAll(".is-invalid"))
        .forEach(function (el) {
          el.classList.remove('is-invalid');
        });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Page load errors
   * @description Donation pages are not sumbitted over ajax. So we need to find the errors
   *              on page load to connect the input errors.
   */
  var pageLoadErrors = function () {
    var $errors = $("#errorExplanation");
    if ($errors.length < 1) {
      return;
    }
    var $formClass = $errors.closest("form").attr("class");
    var errorsHash = {};
    var $modelName = $errors.find("[data-model-name]");
    $errors.find("[data-field-name]").each(function () {
      errorsHash[$(this).data("field-name")] = [];
    });
    NB.EventHub.dispatch("form.failure", {
      errors: {},
      errors_hash: errorsHash,
      object_class: $modelName.data("model-name"),
      form: "." + $formClass,
    });
  };

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Global navbar
   * @description Show/hide more dropdown item based on available width.
   */
  var globalNav = function () {
    var primaryNav = document.querySelector(".navbar-nav-primary");
    if (!primaryNav) {
      return;
    }
    var primaryNavItems = Array.prototype.slice.call(primaryNav.querySelectorAll(".nav-item"));
    var moreNav = document.querySelector(".navbar-more");
    var moreNavToggle = document.querySelector(".navbar-more-toggle");
    var moreNavContainer = document.querySelector(".navbar-more-container");
    var moreNavInner = document.querySelector(".navbar-more-inner");
    var moreNavRoots = document.querySelector(".navbar-more-roots")
    var moreNavRootItems = Array.prototype.slice.call(document.querySelectorAll(".navbar-more-roots .navbar-more-item"));
    var moreNavLeafs = Array.prototype.slice.call(document.querySelectorAll(".navbar-more-leaf"));
    var moreNavContainerSizes = {};
    var moreNavContainerRight = false;

    var totalItems = 0;
    var totalSpace = 0;
    var breakWidths = [];

    primaryNavItems.forEach(function (item) {
      totalSpace += item.clientWidth;
      totalItems += 1;
      breakWidths.push(totalSpace);
    });

    var availableSpace, totalVisibleItems, requiredSpace;

    function showHideNavItems() {
      availableSpace = primaryNav.clientWidth;
      totalVisibleItems = getVisibleItems(primaryNavItems).length;
      requiredSpace = breakWidths[totalVisibleItems - 1];

      if (requiredSpace > availableSpace) {
        moreNav.classList.remove("d-none");
        primaryNavItems.forEach(hideNavItem);
        moreNavRootItems.forEach(showNavItem);
        showHideNavItems();
      } else if (availableSpace > breakWidths[totalVisibleItems]) {
        primaryNavItems.forEach(showNavItem);
        moreNavRootItems.forEach(hideNavItem);
        showHideNavItems();
      } else if (totalVisibleItems === totalItems) {
        moreNav.classList.add("d-none");
      }

      getMoreContainerSizes();
    }

    init();

    function init() {
      moreNavContainer.inert = true;
      showHideNavItems();
      moreNavRoots.style.width = moreNavContainerSizes["initial"].width + 'px';
      window.addEventListener("resize", function () {
        moreNavRoots.style.width = null;
        showHideNavItems();
        moreNavRoots.style.width = moreNavContainerSizes["initial"] + 'px';
      });
      moreNavToggle.addEventListener("keydown", showMoreNavAndFocus);
      moreNavToggle.addEventListener("mouseover", function () {
        setMoreContainerSize();
      });
      moreNav.addEventListener("mouseover", showMoreNav);
      moreNav.addEventListener("mouseleave", hideMoreNav);
      moreNavRootItems.forEach(addRootEventListeners);
    }

    function showNavItem(item, index) {
      if (index >= totalVisibleItems - 1) {
        item.classList.remove("d-none");
      }
    }

    function hideNavItem(item, index) {
      if (index >= totalVisibleItems - 1) {
        item.classList.add("d-none");
      }
    }

    function getVisibleItems(arr) {
      return arr.filter(function (item) {
        return !item.classList.contains("d-none");
      });
    }

    function showMoreNav() {
      moreNavContainer.inert = false;
      moreNavToggle.setAttribute("aria-expanded", true);
      moreNav.setAttribute("data-show", "");
      moreNavContainer.setAttribute("aria-hidden", false);
    }

    function hideMoreNav() {
      moreNavContainer.inert = true;
      moreNavToggle.setAttribute("aria-expanded", false);
      moreNav.removeAttribute("data-show");
      moreNavInner.style = "";
      moreNavContainer.setAttribute("aria-hidden", true);
      resetLeafs();
    }

    function showMoreNavAndFocus(e) {
      if (e.key !== "ArrowDown") return;
      e.preventDefault();
      setMoreContainerSize();
      showMoreNav();
      var items = getVisibleItems(moreNavRootItems);
      items[0].focus();
    }

    function getLeafById(id) {
      return document.getElementById(id);
    }

    function showLeaf(leaf) {
      leaf.setAttribute("data-show", "");
    }

    function getMoreContainerSizes() {
      getInitialContainerSize();
      moreNavContainerRight = false;
      moreNavContainer.classList.remove('navbar-more-container-right');
      moreNavLeafs.forEach(getLeafSize);
      if (moreNavContainerRight) {
        moreNavContainer.classList.add('navbar-more-container-right');
      } else {
        moreNavContainer.classList.remove('navbar-more-container-right');
      }
    }

    function getInitialContainerSize(x) {
      moreNavContainerSizes["initial"] = {
        width: moreNavInner.clientWidth,
        height: moreNavInner.clientHeight,
      };
    }

    function getLeafSize(leaf) {
      leaf.setAttribute("data-show", "");
      moreNavContainerSizes[leaf.id] = {
        width: moreNavInner.clientWidth,
        height: moreNavInner.clientHeight,
      };
      if (isOutOfViewport(moreNavContainer).right === true) {
        moreNavContainerRight = isOutOfViewport(moreNavContainer).right
      }
      leaf.removeAttribute("data-show");
    }

    function setMoreContainerSize(id) {
      var key = id ? id : "initial";
      moreNavInner.style.width = moreNavContainerSizes[key].width + "px";
      moreNavInner.style.height = moreNavContainerSizes[key].height + "px";
    }

    function resetLeafs() {
      moreNavLeafs.forEach(function (root) {
        root.removeAttribute("data-show");
      });
    }

    function handleEscapeKeypress() {
      hideMoreNav();
      setTimeout(function () {
        moreNavToggle.focus();
      }, 100);
    }

    function handleTabKeypress() {
      hideMoreNav();
    }

    function handleArrowUpDownKeypress(event, items) {
      var target = event.target;
      var index = items.indexOf(target);
      if (event.key === "ArrowUp" && index > 0) index--;
      if (event.key === "ArrowDown" && index < items.length - 1) index++;
      index = index === -1 ? 0 : index;
      items[index].focus();
    }

    function addRootEventListeners(root) {
      var leafId = root.dataset.leaf;
      var leaf = getLeafById(leafId);
      var lastFocusedRoot = null;

      root.addEventListener("mouseover", function () {
        resetLeafs();
        if (leaf) {
          showLeaf(leaf);
          setMoreContainerSize(leafId);
        } else {
          setMoreContainerSize();
        }
      });

      root.addEventListener("keydown", function (e) {
        e.preventDefault();
        if (e.key === "Escape") handleEscapeKeypress();
        if (e.key === "Tab") handleTabKeypress();
        var target = e.target;
        var roots = getVisibleItems(moreNavRootItems);
        handleArrowUpDownKeypress(e, roots);
        if (e.key === "ArrowRight" && leaf) {
          lastFocusedRoot = target;
          showLeaf(leaf);
          setMoreContainerSize(leafId);
          setTimeout(function () {
            leaf.querySelector(".navbar-more-item").focus();
          }, 100);
        }
      });

      if (leaf) {
        var leafItems = Array.prototype.slice.call(leaf.querySelectorAll(".navbar-more-item"));
        leafItems.forEach(function (item) {
          item.addEventListener("keydown", function (e) {
            e.preventDefault();
            if (e.key === "Escape") handleEscapeKeypress();
            if (e.key === "Tab") handleTabKeypress();
            handleArrowUpDownKeypress(e, leafItems);
            if (e.key === "ArrowLeft" && lastFocusedRoot) {
              lastFocusedRoot.focus();
              resetLeafs();
              setMoreContainerSize();
            }
          });
        });
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Masonry layouts
   * @description Sort items vertically into columns by finding an optimum layout with a minimum height.
   * @see {@link https://github.com/bigbite/macy.js}
   */
  var masonry = function () {
    var containers = Array.prototype.slice.call(document.querySelectorAll('[data-masonry]'));
    if (!containers) {
      return;
    }
    containers.forEach(function (container) {
      var macy = Macy({
        container: container,
        waitForImages: true,
        margin: 60,
        columns: 2,
        breakAt: {
          992: {
            margin: 30
          },
          768: {
            columns: 1
          }
        }
      });
      var macyIntervalCount = 0;
      var macyInterval = setInterval(function () {
        macyIntervalCount++;
        if (macyIntervalCount >= 30) clearInterval(macyInterval);
        macy.recalculate(true);
      }, 2000);
    });
  }

  var showDropdownsOnHover = function () {
    if (!bsMediaQueryLG.matches) return;

    function toggleDropdown(e) {
      var dropdown = $(e.target).closest('.dropdown');
      var menu = $('.dropdown-menu', dropdown);
      setTimeout(function () {
        var shouldOpen = e.type !== 'click' && dropdown.is(':hover');
        menu.toggleClass('show', shouldOpen);
        dropdown.toggleClass('show', shouldOpen);
        $('[data-toggle="dropdown"]', dropdown).attr('aria-expanded', shouldOpen);
      }, e.type === 'mouseleave' ? 100 : 0);
    }

    $('body')
      .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
      .on('click', '.dropdown-toggle', function () {
        if ($(this).attr('href')) {
          location.href = $(this).attr('href');
        }
      });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Image Cropper
   * @description Crop images on upload
   */
  var cropper = function () {
    if (!jQuery.browser.ie && ImgCropper) {
      var cropperInstances = [];
      var cropperOpen = false;
      var activeCropper = null;
      if ($('.img-cropper').length > 0) {
        var $modal = $('#imgCropperModal');
        if ($('body.page-type-suggestion-box').length > 0) {
          // Suggestion box image cropper
          var imgcrop = new ImgCropper({
            width: 600,
            height: 400,
            aspectRatio: 1.5,
            previewImgSelector: '#suggestionImgPreview',
            previewImgClasses: ['mt-3', 'border', 'rounded'],
            beforeCrop: function () {
              $('.inline-cropper').show();
              $('[data-hidden-on-crop]').hide();
              imgcrop.create();
            },
            afterCrop: function () {
              $('[data-hidden-on-crop]').show();
              $('.inline-cropper').hide();
              imgcrop.destroy();
            }
          });
          $('[data-crop-cancel]').on('click', function () {
            $('[data-hidden-on-crop]').show();
            $('.inline-cropper').hide();
            imgcrop.destroy();
          });
          imgcrop.init();
        } else {
          // All image croppers
          $('.img-cropper:not(.inline)').each(function (i, el) {
            var label = $('label[for="' + this.id + '"]');
            var w = parseInt(label.data('crop-width'));
            var h = parseInt(label.data('crop-height'));
            var imgcrop = new ImgCropper({
              fileInputSelector: '#' + this.id,
              previewImgSelector: '#' + label.data('crop-preview'),
              previewImgClasses: ['mt-3', 'border', 'rounded'],
              beforeCrop: function () {
                activeCropper = i
                $modal.modal('show');
              },
              afterCrop: function () {
                $modal.modal('hide');
              }
            });
            cropperInstances.push(imgcrop);
            if (w && h) {
              $.extend(this.imgcrop.options, {
                width: w,
                height: h,
                aspectRatio: w / h
              });
            }
            imgcrop.init();
            $modal.on('shown.bs.modal', function (e) {
              if (!cropperOpen && activeCropper !== null) {
                cropperInstances[activeCropper].create();
                cropperOpen = true;
              }
            }).on('hidden.bs.modal', function () {
              if (cropperOpen && activeCropper !== null) {
                cropperOpen = false;
                cropperInstances[activeCropper].destroy();
              }
            });
          });
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * User Hosted Events
   */
  var userHostedEvents = function () {
    var uhe = document.querySelector("#uhe");
    if (!uhe) {return;}
    var $venueLabel = $('label[for="event_page_venue_name"]');
    var irlLabel = $venueLabel.text();
    var virtualLabel = $venueLabel.data('virtual-label');
    if ($('#event_page_is_virtual_event').is(':checked')) {
      $('[data-virtual="off"]').hide();
      $venueLabel.text(virtualLabel);
    }
    $('#event_page_is_virtual_event').on('change', function (e) {
      if (this.checked) {
        $('[data-virtual="off"]').hide();
        $venueLabel.text(virtualLabel);
      } else {
        $('[data-virtual="off"]').show();
        $venueLabel.text(irlLabel);
      }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Signin modal errors
   * @description If the signin modal has errors, show the sign in modal
   */
  var signinModalError = function () {
    var $errors = $('#signinModal').find('.errorExplanation');
    if ($errors.length > 0) {
      $('#signinModal').modal('show');
    }
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Featured Content Slider
   * @description Ensure that each item in the slider has the same height
   */
  var getTallestElement = function (e) {
    var tallest = 0;
    e.each(function () {
      $this = $(this);
      if ($this.outerHeight() > tallest) {
        tallest = $this.outerHeight();
      }
    });
    return tallest;
  }
  var fcsInit = function () {
    var $fcs_items = $(".carousel:not(.page-features--img-only) .carousel-item");
    if (!$fcs_items) {return;}
    var fcs_height = getTallestElement($fcs_items)
    $fcs_items.css('height', fcs_height);
    $(window).on("resize", function () {
      $fcs_items.attr('style', '');
      fcs_height = getTallestElement($fcs_items);
      $fcs_items.css('height', fcs_height);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Initalize plugins
   */
  var init = function () {
    keepThemeStylesheetLast();
    addressInputs();
    autoGrow();
    commentForm();
    copyToClipboard();
    cropper();
    fixedHeader();
    floatLabels();
    focusTarget();
    formListeners();
    pageLoadErrors();
    globalNav();
    masonry();
    showDropdownsOnHover();
    userHostedEvents();
    fcsInit();
    signinModalError();
    bsCustomFileInput.init();
    $('[data-toggle="tooltip"]').tooltip();
  };

  init();
})();
