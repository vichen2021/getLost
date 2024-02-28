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
