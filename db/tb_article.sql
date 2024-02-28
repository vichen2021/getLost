-- 删除失物表
DROP TABLE IF EXISTS "tb_article";
-- 创建失物表
CREATE TABLE "tb_article" (
	"item_id" text,
	"user_id" text,
	"item_type" smallint,
	"item_name" text,
	"item_desc" text,
	"item_time" bigint,
	"is_matched" smallint,
	"modify_user" text,
	"create_user" text,
	"modify_time" bigint,
	"enable_mark" smallint,
	"create_time" bigint,
	"image_url" text,
	PRIMARY KEY (item_id)
) WITH (oids = false);
-- 失物表字段说明
COMMENT ON TABLE "tb_article" IS '失物表';
COMMENT ON COLUMN "tb_article"."item_id" IS '物品ID';
COMMENT ON COLUMN "tb_article"."user_id" IS '用户ID';
COMMENT ON COLUMN "tb_article"."item_type" IS '失物或寻物类型（0寻物，1招领）';
COMMENT ON COLUMN "tb_article"."item_name" IS '物品名称';
COMMENT ON COLUMN "tb_article"."item_desc" IS '物品特征描述';
COMMENT ON COLUMN "tb_article"."item_time" IS '丢失或拾取时间';
COMMENT ON COLUMN "tb_article"."is_matched" IS '是否匹配到（0：未匹配，1：已匹配）';
COMMENT ON COLUMN "tb_article"."modify_user" IS '修改人';
COMMENT ON COLUMN "tb_article"."create_user" IS '创建人';
COMMENT ON COLUMN "tb_article"."modify_time" IS '修改时间';
COMMENT ON COLUMN "tb_article"."enable_mark" IS '启用标记';
COMMENT ON COLUMN "tb_article"."create_time" IS '创建时间';
COMMENT ON COLUMN "tb_article"."image_url" IS '图片地址';

-- 失物表基础数据
INSERT INTO "tb_article" ("item_id", "user_id", "item_type", "item_name", "item_desc", "item_time", "is_matched", "modify_user", "create_user", "modify_time", "enable_mark", "create_time", "image_url") VALUES
('e17759b1-83a8-4387-8a43-7dc9dc119ce2',	NULL,	0,	'钥匙',	'数据库初始数据，图片为空，显示为默认图片（钥匙）',	1685005344000,	0,	'admin',	'admin',	1685264654270,	1,	1685264654270,	NULL);

