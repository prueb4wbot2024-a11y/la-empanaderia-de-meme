function enviarPorWhatsApp(nombreCliente, pedidoResumen, total) {
    const numero = "9993611258";
    const mensaje = `Hola, nuevo pedido de: *${nombreCliente}*. %0A%0APedido: ${pedidoResumen} %0A%0ATotal: $${total}`;
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
}
