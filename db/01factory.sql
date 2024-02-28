DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO public;

--删除组别表
DROP TABLE IF EXISTS "tb01group";
--创建组别表
CREATE TABLE "tb01group" (
	"groupid" text,
	"groupname" text,
	PRIMARY KEY (groupid)
) WITH (oids = false);
--组别表业务字段说明
COMMENT ON TABLE "tb01group" IS '用户组别表';
COMMENT ON COLUMN "tb01group"."groupid" IS '组别id';
COMMENT ON COLUMN "tb01group"."groupname" IS '组别名称';
-- 删除操作日志表
DROP TABLE IF EXISTS "tb01log";
-- 创建操作日志表
CREATE TABLE "tb01log" (
	"logid" text,
	"userid" text,
	"type" smallint,
	"description" text,
	"tablename" text,
	"serverid" text,
	"tm" bigint,
	PRIMARY KEY (logid)
) WITH (oids = false);
-- 操作日志表字段说明
COMMENT ON TABLE "tb01log" IS '日志';
COMMENT ON COLUMN "tb01log"."logid" IS '操作记录id';
COMMENT ON COLUMN "tb01log"."userid" IS '操作人id';
COMMENT ON COLUMN "tb01log"."type" IS '操作类型(0新增 1修改 2删除 3未知)';
COMMENT ON COLUMN "tb01log"."description" IS '操作内容';
COMMENT ON COLUMN "tb01log"."tablename" IS '操作表名';
COMMENT ON COLUMN "tb01log"."serverid" IS '服务地址';
COMMENT ON COLUMN "tb01log"."tm" IS '操作时间';
-- 删除菜单表
DROP TABLE IF EXISTS "tb01menu";
-- 创建菜单表
CREATE TABLE "tb01menu" (
	menuid text,
	menuname text,
	pid text,
	weight smallint,
	url text,
	icon text,
	PRIMARY KEY (menuid)
) WITH (oids = false);
-- 菜单表说明
COMMENT ON TABLE "tb01menu" IS '菜单表';
COMMENT ON COLUMN "tb01menu".menuid IS '菜单ID';
COMMENT ON COLUMN "tb01menu".menuname IS '菜单名称';
COMMENT ON COLUMN "tb01menu".pid IS '父级菜单ID';
COMMENT ON COLUMN "tb01menu".weight IS '显示优先级';
COMMENT ON COLUMN "tb01menu".url IS '页面地址';
COMMENT ON COLUMN "tb01menu".icon IS '菜单图标';

-- 菜单表基础数据
INSERT INTO "tb01menu" ("menuid", "menuname", "pid", "weight", "url", "icon")
VALUES 
('DEV000',	'开发专用',	NULL,	1,	NULL,	'/images/sys/setting.png'),
('DEV001',	'开发文档',	'DEV000',	1,	'/docs',	'/images/sys/setting.png'),
('DEV002',	'数据架构',	'DEV000',	1,	'/admin/impexp',	'/images/sys/setting.png'),
('001',	'首页',	NULL,	1,	'/home',	'/images/sys/setting.png'),
('100',	'系统管理',	NULL,	1,	NULL,	'/images/sys/setting.png'),
('101',	'系统设置',	'100',	0,	'/admin/sys/systemstting',	'/images/sys/setting.png'),
('102',	'用户管理',	'100',	2,	'/admin/user',	'/images/sys/yonghu.png'),
('103',	'角色管理',	'100',	1,	'/admin/role',	'/images/sys/yonghu.png'),
('104',	'组别管理',	'100',	1,	'/admin/group',	'/images/sys/yonghu.png'),
('200',	'失物信息',	NULL,	1,	'/admin/swxx',	'/images/zhmtzh.svg'),
('201',	'用户列表',	NULL,	1,	'/admin/yhlb',	'/images/zhmtzh.svg');-- 删除角色表
DROP TABLE IF EXISTS "tb01role";
-- 创建角色表
CREATE TABLE "tb01role" (
	"roleid" text,
	"rolename" text,
	"description" text,
	PRIMARY KEY (roleid)
) WITH (oids = false);
-- 角色表字段说明
COMMENT ON TABLE "tb01role" IS '角色表';
COMMENT ON COLUMN "tb01role"."roleid" IS '角色id';
COMMENT ON COLUMN "tb01role"."rolename" IS '角色名称';
COMMENT ON COLUMN "tb01role"."description" IS '角色描述';

-- 角色表基础数据
INSERT INTO "tb01role" ("roleid", "rolename",  "description") VALUES
('admin',	'管理员', '超级管理员'),
('dev',	'开发', '开发人员专用');
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
-- 在这个表中可以设计自己的系统详情
-- 删除系统表
DROP TABLE IF EXISTS "tb01sys";
-- 创建系统表
CREATE TABLE "tb01sys" (
	key text,
	value text,
	PRIMARY KEY (key)
);
-- 系统表字段说明
COMMENT ON TABLE "tb01sys" IS '系统表';
COMMENT ON COLUMN "tb01sys".key IS '键';
COMMENT ON COLUMN "tb01sys".value IS '值';

-- 系统表数据
-- 在这里可以具体插入（自己写的）
insert into "tb01sys" ("key", "value") values
('sys_name', '失物招领信息发布系统'),
-- 图片路径如果找不到，可以去原子操作中的res.ts里面找
('logo', '/images/sys/homelogo.png');	
-- 删除用户表
DROP TABLE IF EXISTS "tb01user";
-- 创建用户表
CREATE TABLE "tb01user" (
	"userid" text,
	"username" text,
	"sex" smallint,
	"password" text,
	"phone" text,
	"state" smallint,
	"ext" jsonb,
	PRIMARY KEY (userid)
) WITH (oids = false);
-- 用户表字段说明
COMMENT ON TABLE "tb01user" IS '用户表';
COMMENT ON COLUMN "tb01user"."userid" IS '用户名';
COMMENT ON COLUMN "tb01user"."username" IS '姓名';
COMMENT ON COLUMN "tb01user"."sex" IS '性别：0 女 1 男';
COMMENT ON COLUMN "tb01user"."password" IS '密码';
COMMENT ON COLUMN "tb01user"."phone" IS '手机号';
COMMENT ON COLUMN "tb01user"."state" IS '逻辑删除标识：0 删除 1 在用';
COMMENT ON COLUMN "tb01user"."ext" IS '额外用户信息';

-- 用户表基础数据
INSERT INTO "tb01user" ("userid","username","sex","password","phone","state", "ext")
VALUES
('admin','管理员',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}');
-- 删除用户组别关联表
DROP TABLE IF EXISTS "tb01usergroup";
-- 创建用户组别关联表
CREATE TABLE "tb01usergroup" (
	"groupid" text,
	"userid" text,
	PRIMARY KEY (groupid,userid)
) WITH (oids = false);
-- 用户组别关联表字段说明
COMMENT ON TABLE "tb01usergroup" IS '用户组别关联表';
COMMENT ON COLUMN "tb01usergroup"."groupid" IS '组别id';
COMMENT ON COLUMN "tb01usergroup"."userid" IS '用户id';
-- 删除用户角色表关联表
DROP TABLE IF EXISTS "tb01userrole";
-- 创建用户角色表关联表
CREATE TABLE "tb01userrole" (
	"userid" text,
	"roleid" text,
	PRIMARY KEY (userid,roleid)
) WITH (oids = false);
-- 用户角色表关联表字段说明
COMMENT ON TABLE "tb01userrole" IS '用户角色表关联表';
COMMENT ON COLUMN "tb01userrole"."userid" IS '用户id';
COMMENT ON COLUMN "tb01userrole"."roleid" IS '角色id';

-- 用户角色表基础数据
INSERT INTO "tb01userrole" ("userid", "roleid") VALUES
('admin','admin');
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
('e17759b1-83a8-4387-8a43-7dc9dc119ce2',	NULL,	0,	'钥匙',	'操场丢失一串钥匙，联系电话：123456',	1685005344000,	0,	'admin',	'admin',	1685264654270,	1,	1685264654270,	NULL),
('86dbaee6-b3c6-4785-af94-ccfb88aadad5',	'test',	1,	'钥匙',	'南教学楼捡到一串钥匙，带有U盘，失主请联系：123456',	1685116645000,	0,	NULL,	NULL,	1685462305333,	1,	1685462305333,	NULL),
('001',	'admin',	1,	'饭卡',	'在食堂丢失一个饭卡，名字是XXX，联系电话：123456',	1683804762000,	0,	'admin',	'admin',	1685465217575,	1,	NULL,	NULL);

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
delete from "tb01user" where userid <> 'admin';
INSERT INTO "tb01user" ("userid","username","sex","password","phone","state","ext") VALUES
('001','测试用户甲',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}'),
('002','测试用户乙',1,'e10adc3949ba59abbe56e057f20f883e','8888666777',1,'{"email":"10000@qq.com","avatar":"/images/sys/avatar.png","idno":""}');

INSERT INTO "tb01userrole" ("userid", "roleid") VALUES
('admin','dev');
