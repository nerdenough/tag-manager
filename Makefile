DEV_DOCKER_COMPOSE_ARGS := COMPOSE_PROJECT_NAME=tag-manager
DEV_DOCKER_COMPOSE := $(DEV_DOCKER_COMPOSE_ARGS) docker-compose

.PHONY: dev-clean
dev-clean:
	@$(DEV_DOCKER_COMPOSE) down -v

.PHONY: dev-setup
dev-setup:
	@$(DEV_DOCKER_COMPOSE) up -d

.PHONY: dev-start
dev-start:
	@$(DEV_DOCKER_COMPOSE) up -d

.PHONY: dev-stop
dev-stop:
	@$(DEV_DOCKER_COMPOSE) down

.PHONY: dev-logs
dev-logs:
	@$(DEV_DOCKER_COMPOSE) logs --tail 10 -f
