from sqlmodel import create_engine, Session, SQLModel
import os
from urllib.parse import quote_plus


# Build engine dynamically: prefer SQL Server when DB_SERVER is set, otherwise
# fall back to a local SQLite file (good for quick dev).
DB_SERVER = os.environ.get("DB_SERVER")
DB_NAME = os.environ.get("DB_NAME", "smart_campus")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_DRIVER = os.environ.get("DB_DRIVER", "ODBC Driver 18 for SQL Server")
DB_TRUST = os.environ.get("DB_TRUST", "yes")  # yes/no for TrustServerCertificate


def build_sqlserver_connect():
    # If DB_USER is provided, use SQL authentication. Otherwise use Windows auth.
    if DB_USER:
        odbc = (
            f"DRIVER={{{DB_DRIVER}}};"
            f"SERVER={DB_SERVER};DATABASE={DB_NAME};UID={DB_USER};PWD={DB_PASS};"
            f"Encrypt=yes;TrustServerCertificate={DB_TRUST};"
        )
    else:
        # Integrated security (Trusted Connection)
        odbc = (
            f"DRIVER={{{DB_DRIVER}}};"
            f"SERVER={DB_SERVER};DATABASE={DB_NAME};Trusted_Connection=yes;"
            f"TrustServerCertificate={DB_TRUST};"
        )
    return "mssql+pyodbc:///?odbc_connect=" + quote_plus(odbc)


if DB_SERVER:
    DATABASE_URL = build_sqlserver_connect()
else:
    # Default to SQLite file in backend folder
    DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./smart_campus.db")

ECHO_SQL = os.environ.get("ECHO_SQL", "false").lower() in ("1", "true", "yes")
engine = create_engine(DATABASE_URL, echo=ECHO_SQL)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
