# Estructura de Datos - Proyecto en Python

Este proyecto está desarrollado en Python utilizando Flask, SQLAlchemy y PostgreSQL como base de datos.

## 📦 Requisitos

- Python 3.8 o superior
- pip
- PostgreSQL instalado y corriendo
- (Opcional) Entorno virtual recomendado

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/estructura-de-datos-proyecto.git
cd estructura-de-datos-proyecto

Crear y activar entorno virtual
python -m venv venv
venv\Scripts\activate

Instalar dependencias
pip install -r requirements.txt

Configurar variables de entorno
FLASK_APP=src/index.py
FLASK_ENV=development
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/tu_basededatos

