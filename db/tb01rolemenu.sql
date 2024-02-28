-- 删除角色菜单关联表
DROP TABLE IF EXISTS "tb01rolemenu";
-- 创建角色菜单关联表
CREATE TABLE "tb01rolemenu" (
	roleid text,
	menuid text,
	PRIMARY KEY (roleid, menuid)
) WITH (oids = false);
-- 角色菜单关联表说明
COMMENT ON TABLE "tb01rolemenu" IS '角色菜单关联表';
COMMENT ON COLUMN "tb01rolemenu".roleid IS '角色ID';
COMMENT ON COLUMN "tb01rolemenu".menuid IS '菜单ID';
--  角色菜单关联表基础数据
INSERT INTO "tb01rolemenu" ("roleid", "menuid")
VALUES
	('admin1', '100'),
	('admin1', '101'),
	('admin1', '102'),
	('admin1', '103'),
	('admin1', '104'),
	('admin', '200'),
	('admin', '201');
