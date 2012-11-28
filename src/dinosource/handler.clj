(ns dinosource.handler
  	(:use compojure.core
          dinosource.exercise
          ring.util.response
          [ring.middleware.format-response :only [wrap-restful-response]]
          [ring.middleware.format-params :only [wrap-restful-params]])
  	(:require	[compojure.handler :as handler]
    	    	[compojure.route :as route]
             	[clojure.data.json :as json]))

(defroutes app-routes
    (GET "/exercise" [] (response (get-exercise)))
    (GET "/exercise/:id" [id]
         (response (get-exercise (Integer. id))))
    (POST "/exercise/:id" {params :params}
         (response params))
    (route/files "/")
  	(route/not-found "Not Found"))

(def app
	(->
    	(handler/site app-routes)
     	(wrap-restful-params)
    	(wrap-restful-response)))