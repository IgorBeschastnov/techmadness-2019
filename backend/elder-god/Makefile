CODE = elder-god
# Allow setting run level from cli
RUN_LEVEL = local
L = RUN_LEVEL=$(RUN_LEVEL)
# Add source dir to pythonpath
PYTHONPATH = PYTHONPATH=./:$(CODE)
# Executables
ALEMBIC = $(L) $(PYTHONPATH) alembic -c $(CODE)/alembic.ini

.PHONY: migrations db_upgrade db_downgrade lint format

# Actions

migrations:
	$(ALEMBIC) revision --autogenerate -m "$(message)"

db_upgrade:
	$(ALEMBIC) upgrade head

lint:
	pylint --jobs 4 --rcfile=setup.cfg $(CODE)
	black --line-length=100 --skip-string-normalization --check $(CODE)

format:
	isort --apply --recursive $(CODE)
	black --line-length=100 --skip-string-normalization $(CODE)
	unify --in-place --recursive $(CODE)
