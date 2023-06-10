export class AppConsts {
    static ServerAddress = "http://localhost:5000";

    // static ServerAddress = "http://localhost:8800";
    static JwtTokenKey = "jwtToken";

    static GetUserId() {
        var token = localStorage.getItem(AppConsts.JwtTokenKey);
        try {
            var body = JSON.parse(atob(token.split('.')[1]));
            return body.nameid;
        }
        catch (error) {
            return ""
        }
    }
}