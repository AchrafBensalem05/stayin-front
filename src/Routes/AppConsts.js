export class AppConsts {
    // static ServerAddress = "http://localhost:5000";

    static ServerAddress = "http://192.168.56.43:5000";
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