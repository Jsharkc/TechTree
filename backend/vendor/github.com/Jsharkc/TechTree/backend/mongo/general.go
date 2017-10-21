package mongo

import (
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
)

func IsValidObjectID(id bson.ObjectId) bool {
    return IsValidObjectHex(id.Hex())
}

func IsValidObjectHex(id string) bool {
    return bson.IsObjectIdHex(id)
}

func GetByID(session *mgo.Session, collection *mgo.Collection, id string, i interface{}) {
    session.Refresh()
    collection.FindId(bson.ObjectIdHex(id)).One(i)
}

// 根据条件查找
func Find(session *mgo.Session, collection *mgo.Collection, q interface{}) *mgo.Query {
    session.Refresh()
    return collection.Find(q)
}

// 根据条件查找多条记录
func GetMany(session *mgo.Session, collection *mgo.Collection, q interface{}, doc interface{}) error {
    session.Refresh()
    return collection.Find(q).All(doc)
}

// 根据条件查找单条记录
func GetUniqueOne(session *mgo.Session, collection *mgo.Collection, q interface{}, doc interface{}) error {
    session.Refresh()
    return collection.Find(q).One(doc)
}

// 插入记录
func Insert(session *mgo.Session, collection *mgo.Collection, doc interface{}) error {
    session.Refresh()
    return collection.Insert(doc)
}

// 修改记录
func UpdateByQueryField(session *mgo.Session, collection *mgo.Collection, q interface{}, field string, value interface{}) error {
    session.Refresh()
    _, err := collection.UpdateAll(q, bson.M{"$set": bson.M{field: value}})
    return err
}

// 通用更新
func Update(session *mgo.Session, collection *mgo.Collection, query interface{}, i interface{}) error {
    session.Refresh()
    return collection.Update(query, i)
}

// 更新，如果没有就插入
func Upsert(session *mgo.Session, collection *mgo.Collection, query interface{}, i interface{}) (*mgo.ChangeInfo, error) {
    session.Refresh()
    info, err := collection.Upsert(query, i)

    return info, err
}

// 删除
func Delete(session *mgo.Session, collection *mgo.Collection, query interface{}) error {
    session.Refresh()
    return collection.Remove(query)
}
