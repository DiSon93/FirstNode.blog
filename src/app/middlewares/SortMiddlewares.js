module.exports = function SortMiddlewares(req, res, next) {
    //res.local chỉ render ra views, This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on.
    //_sort: đối tượng dc tạo ra
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };
    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.column;

        //Hàm bóc tách Object assign, nếu tham số thứ 2 giống tham số thứ nhất sẽ ghi đè lên
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
};
