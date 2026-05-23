/**
 * ActionButton Basic Page Layout Template
 * @description Render the ActionButton template on Basic page types
 */

!(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const allAbButtons = document.querySelectorAll('.page-type-basic [src*="embed.actionbutton.co"]');

    if (allAbButtons.length > 0) {
      let firstAbButton = allAbButtons[0];
      const pageContentContainer = document.querySelector('.page-content');

      // remove actionbuttons from dom
      allAbButtons.forEach((abButton, index) => {
        if (abButton.nodeName === "SCRIPT") {
          abButton = abButton.previousElementSibling;
          pageContentContainer.removeChild(abButton);
          if (index === 0) firstAbButton = abButton;
        } else {
          // parentElement is the <p> that wraps the iframe in the editor
          pageContentContainer.removeChild(abButton.parentElement);
        }
      });

      const newTextContainerWrapper = document.createElement("div");
      const newTextContainer = document.createElement("div");

      newTextContainer.insertAdjacentHTML('beforeend', pageContentContainer.innerHTML);
      newTextContainer.classList.add('text-container');

      newTextContainerWrapper.appendChild(newTextContainer);
      newTextContainerWrapper.classList.add('text-container-wrapper');

      pageContentContainer.replaceChildren(newTextContainerWrapper, firstAbButton);

      document.body.classList.add('has-actionbutton');
    }
  });
})();
