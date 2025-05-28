import re
from flask import request, jsonify
from models.TabletModel import db, Tablet
from models.DesignStudentsModel import DesignStudents

def solo_letras(texto):
    return bool(re.fullmatch(r'[A-Za-zÁÉÍÓÚáéíóúñÑ ]+', texto))

def solo_numeros(texto):
    return bool(re.fullmatch(r'\d+', texto))

def sin_caracteres_especiales(texto):
    return bool(re.fullmatch(r'[A-Za-z0-9 ]+', texto))

def es_entero(valor):
    try:
        int(valor)
        return True
    except (ValueError, TypeError):
        return False

def es_decimal(valor):
    try:
        float(valor)
        return True
    except (ValueError, TypeError):
        return False

def create_tablet():
    data = request.get_json()
    
    serial = data.get('serial')
    marca = data.get('marca')     
    tamaño = data.get('tamaño')
    precio = data.get('precio')
    almacenamiento = data.get('almacenamiento')
    peso = data.get('peso')
    disponible = data.get('disponible')

    if not all([serial, marca, tamaño, precio, almacenamiento, peso]):
        return jsonify({"error": "Faltan datos requeridos"}), 400
    
    if not solo_letras(marca):
        return jsonify({"error": "La marca solo debe contener letras"}), 400
    if not es_decimal(tamaño):
        return jsonify({"error": "El tamaño solo debe contener numeros decimales"}), 400
    if not es_decimal(precio):
        return jsonify({"error": "El precio solo debe contener números decimales"}), 400
    if not sin_caracteres_especiales(almacenamiento):
        return jsonify({"error": "El almacenamiento no debe tener caracteres especiales"}), 400
    if not es_decimal(peso):
        return jsonify({"error": "El peso solo debe contener numero decimales"}), 400
    
    nuevo_tablet = Tablet(
        serial=serial,
        marca=marca,
        tamaño=tamaño,
        precio=precio,
        almacenamiento=almacenamiento,
        peso=peso,
        disponible=disponible
    )
    db.session.add(nuevo_tablet)
    db.session.commit()

    return jsonify({
        "estdudiante indexado con el id": nuevo_tablet.id,
        "message": "Tablet ingresada exitosamente",
    }), 201

def show_tablets():
    tablets = Tablet.query.all()
    return jsonify([tablets.to_dict() for tablets in tablets]), 200

def rentar_tablet_a_estudiante():
    data = request.get_json()
    print(data)
    tablet_id = data.get('tablet_id')
    estudiante_id = data.get('estudiante_id')
    
    if not tablet_id or not estudiante_id:
        return jsonify({"error": "Faltan el ID del PC o del estudiante"}), 400

    # Obtener el PC
    tablet = Tablet.query.get(tablet_id)
    print(tablet)
    if not tablet:
        return jsonify({"error": "PC no encontrado"}), 404

    if not tablet.disponible:
        return jsonify({"error": "El PC ya está rentado"}), 400

    # Obtener el estudiante
    estudiante = DesignStudents.query.get(estudiante_id)
    if not estudiante:
        return jsonify({"error": "Estudiante no encontrado"}), 404

    # Asignar el serial del PC al estudiante (o el campo que uses para vincular)
    estudiante.FK_serial = tablet.serial  # o estudiante.pc_id = pc.id si usas esa relación
    estudiante.tablet_asignado = True # Cambia esto a True si el estudiante ya tiene un PC asignado
    # Marcar el PC como no disponible
    tablet.disponible = False

    db.session.commit()

    return jsonify({"message": "Tablet rentada correctamente"}), 200

def eliminar_tablet(id):
    tablet = Tablet.query.get_or_404(id)
    db.session.delete(tablet)
    db.session.commit() 
    return jsonify({"message": "Tablet eliminada exitosamente"}), 200

def devolver_tablet():
    data = request.get_json()
    serial = data.get('serial')
    estudiante_id = data.get('estudiante_id')
    print(data)
    print(serial, estudiante_id)
    if not estudiante_id or not serial:
        return jsonify({"error": "Faltan el ID del PC o del estudiante"}), 400
    
    estudiante = DesignStudents.query.get(estudiante_id)

    if not estudiante:
        return jsonify({"error": "Estudiante no encontrado"}), 404
    
    tablet = Tablet.query.filter_by(serial=serial).first()
    if not tablet:
        return jsonify({"error": "Tablet no encontrada"}), 404
    
    estudiante.FK_serial = None
    estudiante.tablet_asignado = False
    tablet.disponible = True
    db.session.commit()

    return jsonify({"message": "Tablet devuelta correctamente"}), 200

def get_tablet(id):
    tablet = Tablet.query.get_or_404(id)
    return jsonify(tablet.to_dict()), 200  

def update_tablet(id):
    data = request.get_json()
    tablet = Tablet.query.get_or_404(id)

    tablet.serial = data.get('serial', tablet.serial)
    tablet.marca = data.get('marca', tablet.marca)
    tablet.tamaño = data.get('tamaño', tablet.tamaño)
    tablet.precio = data.get('precio', tablet.precio)
    tablet.almacenamiento = data.get('almacenamiento', tablet.almacenamiento)
    tablet.peso = data.get('peso', tablet.peso)


    db.session.commit()

    return jsonify(tablet.to_dict()), 200

def buscar_tablet():
    marca = request.args.get('marca', '').strip()
    serial = request.args.get('serial', '').strip()

    query = Tablet.query

    if marca and serial:
        query = query.filter(
            Tablet.marca.ilike(f"%{marca}%"),
            Tablet.serial.ilike(f"%{serial}%")
        )
    elif marca:
        query = query.filter(Tablet.marca.ilike(f"%{marca}%"))
    elif serial:
        query = query.filter(Tablet.serial.ilike(f"%{serial}%"))
    else:
        # Si no hay parámetros, retornar lista vacía
        return jsonify([])

    tablet = query.all()
    if not tablet:
        return jsonify({"mensaje": "Tablet no encontrada"}), 404
    return jsonify([e.to_dict() for e in tablet]), 200

