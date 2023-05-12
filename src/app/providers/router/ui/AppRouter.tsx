import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";

// Компонент для роутинга
const AppRouter = () => {
    return ( 
            <Suspense fallback={<div>loading...</div>}>
                <Routes>
                    {/* получать Route будем из конфига */}
                    {Object.values(routeConfig).map(({element, path})=> (
                        <Route 
                            key={path} path={path} element={element}/>
                    ))}
                </Routes>
            </Suspense>
     );
}

export default AppRouter;