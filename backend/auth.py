import os
from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash


auth_bp = Blueprint("auth", __name__, url_prefix="/api/admin")

ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    password = (data.get("password") or "").strip()

    if not ADMIN_PASSWORD_HASH or not check_password_hash(ADMIN_PASSWORD_HASH, password):
        return jsonify({"error": "invalid password"}), 401

    session["is_admin"] = True
    return jsonify({"ok": True})

@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("is_admin", None)
    return jsonify({"ok": True})

@auth_bp.route("/", methods=["GET"])
def me():
    return jsonify({"is_admin": bool(session.get("is_admin"))})
