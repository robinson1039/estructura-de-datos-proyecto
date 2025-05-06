from flask import request, jsonify
from models.EstudiantesModel import db, Estudiante

def create_estudiante():
    data = request.get_json()
    
    cedula = data.get('cedula')
    nombre = data.get('nombre')     
    apellido = data.get('apellido')
    telefono = data.get('telefono')
    semestre_actual = data.get('semestre_actual')
    promedio_acumulado = data.get('promedio_acumulado')
    serial = data.get('serial')

    if not all([cedula, nombre, apellido, telefono, semestre_actual, promedio_acumulado, serial]):
        return jsonify({"error": "Faltan datos requeridos"}), 400
    
    nuevo_estudiante = Estudiante(
        cedula=cedula,
        nombre=nombre,
        apellido=apellido,
        telefono=telefono,
        semestre_actual=semestre_actual,
        promedio_acumulado=promedio_acumulado,
        serial=serial
    )
    db.session.add(nuevo_estudiante)
    db.session.commit()

    return jsonify({
        "estdudiante indexado con el id": nuevo_estudiante.id,
        "message": "Estudiante creado exitosamente",
    }), 201

def get_estudiantes():
    estudiantes = Estudiante.query.all()
    return jsonify([estudiante.to_dict() for estudiante in estudiantes]), 200

def get_estudiante(id):
    estudiante = Estudiante.query.get_or_404(id)
    return jsonify(estudiante.to_dict()), 200

def update_estudiante(id):
    data = request.get_json()
    estudiante = Estudiante.query.get_or_404(id)

    estudiante.cedula = data.get('cedula', estudiante.cedula)
    estudiante.nombre = data.get('nombre', estudiante.nombre)
    estudiante.apellido = data.get('apellido', estudiante.apellido)
    estudiante.telefono = data.get('telefono', estudiante.telefono)
    estudiante.semestre_actual = data.get('semestre_actual', estudiante.semestre_actual)
    estudiante.promedio_acumulado = data.get('promedio_acumulado', estudiante.promedio_acumulado)
    estudiante.serial = data.get('serial', estudiante.serial)

    db.session.commit()

    return jsonify(estudiante.to_dict()), 200

def delete_estudiante(id):
    estudiante = Estudiante.query.get_or_404(id)
    db.session.delete(estudiante)
    db.session.commit()
    return jsonify({"message": "Estudiante eliminado exitosamente"}), 200

def buscar_estudiante():
    nombre = request.args.get('nombre', '').strip()
    cedula = request.args.get('cedula', '').strip()

    query = Estudiante.query

    if nombre and cedula:
        query = query.filter(
            Estudiante.nombre.ilike(f"%{nombre}%"),
            Estudiante.cedula.ilike(f"%{cedula}%")
        )
    elif nombre:
        query = query.filter(Estudiante.nombre.ilike(f"%{nombre}%"))
    elif cedula:
        query = query.filter(Estudiante.cedula.ilike(f"%{cedula}%"))
    else:
        # Si no hay parámetros, retornar lista vacía
        return jsonify([])

    estudiantes = query.all()
    return jsonify([e.to_dict() for e in estudiantes])