//Mostrar datos al modal para editar y borrar productos
$(document).ready(function() {
    $('#mytable').on('click', '.edit', function() {
        let p_id = $(this).data('producto_id');
        let p_variedad = $(this).data('variedad');
        let p_tipo = $(this).data('tipo');
        let p_precio = $(this).data('precio');

        $('#EditModal').modal('show');
        $('.prodId').val(p_id);
        $('.variedad').val(p_variedad);
        $('.prodTipo').val(p_tipo);
        $('.prodPrecio').val(p_precio);
    })

    $('#mytable').on('click', '.delete', function() {
        let p_id = $(this).data('id');
        $('#DeleteModal').modal('show');
        $('.prod_id2').val(p_id);
    })
})