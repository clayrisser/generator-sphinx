BUILDDIR=build
SOURCEDIR=docs
SPHINXBUILD=sphinx-build
SPHINXOPTS=
SPHINXPROJ=test

.PHONY: start
start: serve
	@echo

.PHONY: serve
serve: build
	@cd build/html && python3 -m http.server

.PHONY: help
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: build
build: env clean html
	@echo ::: BUILD :::

env:
	@virtualenv env
	@env/bin/pip3 install -r requirements.txt
	@pip3 install git+https://github.com/jamrizzi/sphinx-js.git
	@echo ::: ENV :::

.PHONY: freeze
freeze:
	@env/bin/pip3 freeze > requirements.txt
	@echo ::: FREEZE :::

.PHONY: Makefile
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
