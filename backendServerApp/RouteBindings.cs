using Microsoft.AspNetCore.Http; //to Use Results,IResult Type
using App.Configurations; // to access the configurations
using System.Threading.Tasks;

namespace App.RouteBindings
{
  public static class RouteMethods{
    public static IResult IndexMethod(){
      return Results.LocalRedirect("~/index.html",false,true);
    }
    public static IResult pageRedirect(HttpRequest request){
      return Results.LocalRedirect($"~{request.Path}/index.html",false,true);
    }
    public static IResult pageRedirectWithParams(HttpRequest request){
      var param="serialNum";
      var val = request.Query[$"{param}"];
      return Results.LocalRedirect($"~{request.Path}/index.html?{param}={val}",false,true);
    }

    public static IResult MoveToHomeScreen(HttpRequest request){
      return Results.LocalRedirect("~/Home",false,true);
    }
    public static async Task provideSampleData(HttpContext context){
      await context.Response.WriteAsync("["+
                                "[\"OP 10\",\"Base Circle\",\"14.6\",\"0.0013\",\"2.13\",\"1.09\",\"2\"],"+
                                "[\"OP 20\",\"Side Circle\",\"13.2\",\"0.029\",\"0.13\",\"0.06\",\"0\"],"+
                                "[\"OP 60\",\"SRC Dia\",\"17.8\",\"0.0043\",\"1.13\",\"1.09\",\"1\"]"+
                                "]");
    }
  } 
}