export function triggerFrostyTransition(label: string, target: string) {
  window.dispatchEvent(
    new CustomEvent("frosty-nav-transition", {
      detail: { label, target },
    }),
  );
}
