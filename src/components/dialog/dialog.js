// Liga botões a <dialog class="ds-dialog"> só com atributos: data-dialog-open="id" abre, data-dialog-close fecha.
// Foco preso, Esc e fundo inerte vêm do próprio <dialog>.
function isOnBackdrop(dialog, event) {
  const box = dialog.getBoundingClientRect();
  return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
}

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-dialog-open]');
  if (opener) {
    document.getElementById(opener.dataset.dialogOpen)?.showModal();
    return;
  }

  const closer = event.target.closest('[data-dialog-close]');
  if (closer) {
    closer.closest('dialog')?.close(closer.dataset.dialogClose);
    return;
  }

  // O clique no fundo escurecido chega com o próprio <dialog> como alvo; data-static desliga esse atalho.
  const dialog = event.target;
  if (dialog.matches?.('.ds-dialog:modal:not([data-static])') && isOnBackdrop(dialog, event)) {
    dialog.close();
  }
});
