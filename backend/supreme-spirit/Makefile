CODE = .
SCRIPTS = scripts/
# Allow setting run level from cli
RUN_LEVEL = local
L = RUN_LEVEL=$(RUN_LEVEL)
# Add source dir to pythonpath
PYTHONPATH = PYTHONPATH=./:$(CODE)
# Executables
PYTHON = $(PYTHONPATH) python
ALEMBIC = $(L) $(PYTHONPATH) alembic -c $(CODE)/alembic.ini
DOWNGRADE_DEFAULT = -1

.PHONY: migrations db_upgrade db_downgrade lint format

# Actions

exec:
	$(PYTHON) $(SCRIPTS)${s}.py

migrations:
	$(ALEMBIC) revision --autogenerate -m "$(message)"

db_upgrade:
	$(ALEMBIC) upgrade head

db_downgrade:
	$(ALEMBIC) downgrade $(DOWNGRADE_DEFAULT)

lint:
	pylint --jobs 4 --rcfile=setup.cfg $(CODE)
	black --line-length=100 --skip-string-normalization --check $(CODE)

format:
	isort --apply --recursive $(CODE)
	black --line-length=100 --skip-string-normalization $(CODE)
	unify --in-place --recursive $(CODE)
