//Mostrar datos al modal para editar y borrar registro
$(document).ready(function() {
    $('#mytable').on('click', '.edit', function() {
        let c_id = $(this).data('cliente_id');
        let c_nombre = $(this).data('nombre');
        let c_apellido = $(this).data('apellido');
        let c_email = $(this).data('email');

        $('#EditModal').modal('show');
        $('.cliente_id').val(c_id);
        $('.c_nombre').val(c_nombre);
        $('.c_apellido').val(c_apellido);
        $('.c_email').val(c_email);
    })

    $('#mytable').on('click', '.delete', function() {
        let c_id = $(this).data('id');
        $('#DeleteModal').modal('show');
        $('.cliente_id2').val(c_id);
    })
})