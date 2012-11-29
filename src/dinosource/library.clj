(ns dinosource.library)

(defn available-functions []
  ;; Returns a map of all public functions in the library namespace,
  ;; with their names converted to keywords.

  ;; FIXME: how can I refer to the containing namespace (dinosource.library)?
  ;; *ns* means the current namespace in runtime (e.g, #<Namespace user> in the repl)
  (into {} (map #(vector (keyword (name (first %))) (nth % 1)) (seq (ns-publics 'dinosource.library)))))

(defn get-function [name]
  (name (available-functions)))

(defn on [x y]
  [{:x x
    :y y
    :state :on}])


