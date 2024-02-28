-- 删除用户表
DROP TABLE IF EXISTS "tb_user";
-- 创建用户表
CREATE TABLE "tb_user" (
	"user_id" text,
	"username" text,
	"password" text,
	"phone" text,
	"last_time" bigint,
	"create_time" bigint,
	"create_user" text,
	"modify_time" bigint,
	"modify_user" text,
	"enable_mark" smallint,
	"descriptioin" text,
	"is_admin" smallint,
	PRIMARY KEY (user_id)
) WITH (oids = false);
-- 用户表字段说明
COMMENT ON TABLE "tb_user" IS '用户表';
COMMENT ON COLUMN "tb_user"."user_id" IS '用户ID';
COMMENT ON COLUMN "tb_user"."username" IS '用户名';
COMMENT ON COLUMN "tb_user"."password" IS '密码';
COMMENT ON COLUMN "tb_user"."phone" IS '手机号';
COMMENT ON COLUMN "tb_user"."last_time" IS '上次登录时间';
COMMENT ON COLUMN "tb_user"."create_time" IS '创建时间';
COMMENT ON COLUMN "tb_user"."create_user" IS '创建人';
COMMENT ON COLUMN "tb_user"."modify_time" IS '修改时间';
COMMENT ON COLUMN "tb_user"."modify_user" IS '修改用户';
COMMENT ON COLUMN "tb_user"."enable_mark" IS '启用标记';
COMMENT ON COLUMN "tb_user"."descriptioin" IS '备注';
COMMENT ON COLUMN "tb_user"."is_admin" IS '身份识别是否为管理员，0为非管理员，1是管理员';

-- 用户表基础数据
INSERT INTO "tb_user" ("user_id", "username", "password","phone","last_time", "create_time", "create_user", "modify_time", "modify_user", "enable_mark", "descriptioin", "is_admin") VALUES
('admin',	'admin',	'e10adc3949ba59abbe56e057f20f883e','17634280716',1685000960718,	1685000960718,	'admin',	1685000960718,	'admin',	1,	NULL,	1),
('test',	'张三',	'e10adc3949ba59abbe56e057f20f883e','17634280716',1685279174415,	1685279174415,	NULL,	1685279174415,	NULL,	1,	'测试添加用户',	0);
